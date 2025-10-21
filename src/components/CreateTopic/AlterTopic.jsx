import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";

const AlterTopic = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-10xl mx-auto p-5 font-sans">
      <NavBar />
      <div className="flex flex-col md:flex-row">
        <SideBar />
        <main className="flex-1 p-5 bg-gray-100 rounded-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Alter Topic:
          </h2>
          <div className="bg-white font-semibold rounded-lg p-5 mb-5 shadow">
            <label className="block text-gray-600 mb-1">Topic Name:</label>
            <input
              type="text"
              required
              placeholder="Topic Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <br />
            <label className="block text-gray-600 mb-1">
              Number of partitions:
            </label>
            <input
              type="number"
              required
              placeholder="Number of partitions"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <br />
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 m-3 rounded font-medium">
              Alter
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-medium"
            >
              Cancel
            </button>
            <br />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlterTopic;
