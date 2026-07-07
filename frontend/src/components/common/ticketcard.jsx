import QRCode from "react-qr-code";

export default function TicketCard({ ticket }) {
  return (
    <div className="w-[320px] h-[110px] border-2 border-dashed border-slate-400 rounded-lg p-4 flex justify-between items-center bg-white">
      <div className="flex-1">
        <h3 className="text-[10px] font-bold tracking-widest">TICKET VOYAGE</h3>

        <p className="text-blue-700 text-xl font-bold">{ticket.num_ticket}</p>

        
        <p className="text-[10px] text-gray-500">
          EXP : {new Date(ticket.expired_at).toLocaleString()}
        </p>
      </div>

      <div className="border-l pl-4 flex flex-col items-center">
        <QRCode value={ticket.qr_code} size={70} />

        <span className="text-[8px] mt-1">SCAN UNIQUE</span>
      </div>
    </div>
  );
}
