export default function Table({ title, headers, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="bg-[#6F6E84] text-white px-6 py-4 font-bold text-sm">
        {title}
      </div>

      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-mono">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
}
