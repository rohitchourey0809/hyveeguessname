"use client";
import { useState } from "react";

export default function Guessform() {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [ageRes, genderRes, countryRes] = await Promise.all([
      fetch(`https://api.agify.io?name=${name}`),
      fetch(`https://api.genderize.io?name=${name}`),
      fetch(`https://api.nationalize.io?name=${name}`),
    ]);

    const ageData = await ageRes.json();
    const genderData = await genderRes.json();
    const countryData = await countryRes.json();

    const result = {
      age: ageData.age,
      gender: genderData.gender,
      country: countryData.country,
    };

    console.log("result", result);

    setData(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-cyan-950 font-serif font-bold mb-6 text-center hover:text-pink-600 hover:underline">
          Guess Name
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            required
            className="p-3 text-green-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <button
            type="submit"
            className="p-3 hover:text-pink-600 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            Guess
          </button>
        </form>

        {data && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner transition duration-300 ease-in-out transform hover:scale-105">
         
            <div className="overflow-x-auto">
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
                    <td className="px-4 py-2 text-sm text-gray-500">Age</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {data.age}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-500">Gender</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {data.gender}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      Countries
                    </td>
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
          </div>
        )}
      </div>
    </main>
  );
}
