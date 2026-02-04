import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Premium Color Palette
const COLORS = [
  "#0ea5e9", // Primary Sky
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#6366f1", // Indigo
];

const UniversityPieChart = ({ universityData }) => {
  const pieChartData = universityData.map((item) => ({
    name: item.university,
    value: item.count,
  }));

  return (
    <div className="bg-base-100 border border-base-200 rounded-[2.5rem] p-8 shadow-xl shadow-base-300/10 w-full hover:shadow-2xl transition-all duration-500">
      {/* Header Area */}
      <div className="mb-8 text-left">
        <h3 className="text-xl font-black text-base-content tracking-tight">
          University{" "}
          <span className="text-primary text-sm font-medium opacity-50">
            / Distribution
          </span>
        </h3>
        <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">
          Based on scholarship applications
        </p>
      </div>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            {/* Doughnut Style Pie */}
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              stroke="none"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                />
              ))}
            </Pie>

            {/* Custom Styled Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ fontWeight: "bold", fontSize: "12px" }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Footer (Optional Premium Addition) */}
      <div className="mt-6 pt-6 border-t border-base-200 flex justify-around text-center">
        <div>
          <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
            Total Institutes
          </p>
          <p className="text-lg font-black text-base-content">
            {universityData.length}
          </p>
        </div>
        <div className="w-px h-8 bg-base-200"></div>
        <div>
          <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
            Top University
          </p>
          <p className="text-lg font-black text-primary truncate max-w-[120px]">
            {pieChartData[0]?.name || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityPieChart;
