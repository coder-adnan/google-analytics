import React from "react";

interface AnalyticsData {
  dimensions: string[];
  metrics: { values: string[] }[];
}

const AnalyticsTable = ({ data }: { data: AnalyticsData[] }) => {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Sessions</th>
            <th className="px-4 py-2 text-left">Pageviews</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{row.dimensions[0]}</td>
              <td className="px-4 py-2">{row.metrics[0].values[0]}</td>
              <td className="px-4 py-2">{row.metrics[0].values[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsTable;
