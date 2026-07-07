import { prisma } from "../client";

export class TripRequestService {
  async createTripRequest(data: any) {
    return await prisma.tripRequest.create({ data });
  }

  async getAllTripRequests() {
    return await prisma.tripRequest.findMany();
  }

  async getTripRequestById(id_tripRequest: number) {
    return await prisma.tripRequest.findUnique({
      where: { id_req: id_tripRequest },
    });
  }

  async updateTripRequest(id_tripRequest: number, data: any) {
    return await prisma.tripRequest.update({
      where: { id_req: id_tripRequest },
      data,
    });
  }

  async deleteTripRequest(id_tripRequest: number) {
    return await prisma.tripRequest.delete({
      where: { id_req: id_tripRequest },
    });
  }
}
