export default function Table({ title, headers, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="bg-[#4d7c65] text-white px-6 py-4 font-bold text-sm rounded-t-xl">
        {title}
      </div>

      <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm text-gray-600">
          <thead className="sticky top-0 bg-gray-50 text-xs text-gray-400 uppercase font-mono z-10">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 bg-gray-50">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
