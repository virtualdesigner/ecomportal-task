// components/ClientComponent.js
"use client";

import { useState } from "react";

export default function ClientTable({ initialData }: { initialData: Array<Record<string, any>> }) {
  const [data, setData] = useState(initialData);

  const reloadData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const newData = await res.json();
    setData(newData.slice(0, 10));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="mb-4 flex justify-end">
        <button
          onClick={reloadData}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
        >
          Reload Data
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
