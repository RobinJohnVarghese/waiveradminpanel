"use client"

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarCharts = ({ stats }: { stats: any }) => {
  const driverData = [
    { name: "Active", value: stats?.driver.active || 0 },
    { name: "Blocked", value: stats?.driver.blocked || 0 },
    { name: "Pending", value: stats?.driver.pending || 0 },
    { name: "Rejected", value: stats?.driver.rejected || 0 },
    { name: "Total", value: stats?.driver.total || 0 },
  ];

  return (
    <div className="pt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={driverData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: "10px", fill: "#555" }} 
          />
          <YAxis
            tick={{ fontSize: "10px", fill: "#555" }} 
          />
          <Tooltip
            contentStyle={{
              fontSize: "12px", 
            }}
          />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;