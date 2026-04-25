"use client";

import React, { Fragment } from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";

const COLORS = ["#4CAF50", "#FF5722", "#2196F3", "#FFC107", "#9C27B0"];

const PiChart = ({ stats }: { stats: any }) => {
    const userData = [
        { name: "Active", value: stats?.user.active > 0 ? stats?.user.active : 1 },
        { name: "Blocked", value:  stats?.user.blocked > 0 ? stats?.user.blocked : 1},
        { name: "Total", value: stats?.user.total || 1 },
    ];

    const isEmpty = userData.every((data) => data.value === 0);

    return (
        <Fragment>
            {!isEmpty &&
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-lg shadow-md">
                    {isEmpty ? (
                        <div className="text-gray-500 text-sm md:text-base">
                            No data available
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={userData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                        >
                            {userData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                    )}
                </div>
            }
        </Fragment>

    );
};

export default PiChart;