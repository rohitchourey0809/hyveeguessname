// components/Table.js
import React from "react";

const Table = ({ data }) => {
  return (
    <div className="animate-flip-down animate-infinite mt-6 p-4 bg-gray-50 rounded-lg shadow-inner transition duration-300 ease-in-out transform hover:scale-105 w-full overflow-x-auto">
      <h2 className="text-xl text-black font-semibold mb-4 hover:text-pink-600">
        Results
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attribute
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 text-sm text-gray-500">Name</td>
            <td className="px-4 py-2 text-sm text-gray-900">{data.name}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-sm text-gray-500">Age</td>
            <td className="px-4 py-2 text-sm text-gray-900">{data.age}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-sm text-gray-500">Gender</td>
            <td className="px-4 py-2 text-sm text-gray-900">{data.gender}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-sm text-gray-500">Countries</td>
            <td className="px-4 py-2 text-sm text-gray-900">
              <ul className="list-disc pl-5">
                {data.country.map((c) => (
                  <li key={c.country_id}>{c.country_id}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
