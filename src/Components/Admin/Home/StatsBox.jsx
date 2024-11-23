import React from "react";

function StatsBox({ text, value }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4">
      <div className="text-sm font-normal leading-5 text-gray-600 mb-2">
        {text}
      </div>
      <hr className="w-full my-2 border-gray-300" />
      <div className="text-lg font-semibold leading-6 text-gray-800">
        {value}
      </div>
    </div>
  );
}

export default StatsBox;