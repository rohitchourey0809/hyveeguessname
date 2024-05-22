"use client";
import { useState } from "react";
import Table from "./Table";

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
      name: ageData.name,
      age: ageData.age,
      gender: genderData.gender,
      country: countryData.country,
    };

    console.log("result", result);

    setData(result);
    setName("")
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="animate-wiggle-more w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h1 className="animate-wiggle-more animate-infinite  text-2xl hover:text-cyan-950 font-serif font-bold mb-6 text-center text-pink-600 hover:underline">
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
            className="animate-bounce   p-3 hover:text-pink-600 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            Guess
          </button>
        </form>

        {data && <Table data={data} />}
      </div>
    </main>
  );
}
