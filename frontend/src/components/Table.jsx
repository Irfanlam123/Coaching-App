export default function Table({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-blue-900 text-white">
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="px-4 py-2 border border-gray-300">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              {Object.values(row).map((val, i) => (
                <td key={i} className="px-4 py-2 border border-gray-300">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
