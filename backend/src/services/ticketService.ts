import { prisma } from "../client.js";
import { v4 as uuidv4 } from "uuid";

export class TicketService {
  async getAllTickets(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
        include: {
          stop: true,
        },
      }),
      prisma.ticket.count(),
    ]);

    return {
      data: tickets,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async generateTicketsBatch(terminusId: number, count: number, price: number) {
    const terminus = await prisma.stop.findUnique({
      where: { id_stop: terminusId },
    });
    if (!terminus) throw new Error("L'arrêt (Terminus) spécifié n'existe pas.");

    const ticketsData = [];
    const batchIdentifier = Date.now().toString().slice(-6);

    for (let i = 1; i <= count; i++) {
      const expired_at = new Date();
      expired_at.setDate(expired_at.getDate() + 30);
      ticketsData.push({
        num_ticket: `TK-${batchIdentifier}-${i}`,
        qr_code: uuidv4(),
        price: price,
        stop_id: terminusId,
        expired_at: expired_at,
        status_ticket: "AVAILABLE",
      });
    }

    return await prisma.ticket.createMany({
      data: ticketsData,
    });
  }

  async scanAndValidateTicket(qrCode: string, driverId: number) {
    const bus = await prisma.bus.findFirst({
      where: {
        driver_id: driverId,
        status_bus: "Actif",
      },
    });

    if (!bus) {
      throw new Error(
        "Action impossible : aucun bus actif n'est assigné à votre compte Chauffeur.",
      );
    }

    const busId = bus.id_bus;

    const ticket = await prisma.ticket.findUnique({
      where: { qr_code: qrCode },
      include: { stop: true, bus: true, driver: true },
    });

    if (!ticket) throw new Error("QR Code invalide ou contrefait.");
    if (ticket.status_ticket === "Utilisé")
      throw new Error("Ce ticket a déjà été scanné et utilisé.");
    if (ticket.status_ticket === "Annulé")
      throw new Error("Ce ticket a été annulé.");

    return await prisma.$transaction(async (tx) => {
      const updatedTicket = await tx.ticket.update({
        where: { qr_code: qrCode },
        data: {
          status_ticket: "Utilisé",
          driver_id: driverId,
          bus_id: busId,
        },
      });

      const line = await tx.line.findFirst({
        where: { bus_id: busId },
      });

      if (!line) {
        throw new Error(
          "Aucune ligne de transport active n'est associée à votre bus.",
        );
      }

      const income = await tx.income.create({
        data: {
          ticket_id: ticket.id_ticket,
          bus_id: busId,
          amount: line.price,
          date_in: new Date(),
          description: `Scan Ticket ${ticket.num_ticket} - Bus ${bus.registration}`,
        },
      });

      return {
        ticket: updatedTicket,
        income: income,
        bus_registration: bus.registration,
      };
    });
  }
}
