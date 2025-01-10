"use client";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import "./GlobalAnalytics.css";
import ChatBot from "./chatbot";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const reelsData = [
  { name: "Likes", value: 5000 },
  { name: "Comments", value: 2000 },
  { name: "Shares", value: 1000 },
];

const carouselData = [
  { name: "Likes", value: 4000 },
  { name: "Comments", value: 1800 },
  { name: "Shares", value: 900 },
];

const staticImagesData = [
  { name: "Likes", value: 3000 },
  { name: "Comments", value: 1500 },
  { name: "Shares", value: 700 },
];

function GlobalAnalytics() {
  return (
    <div className="pb-12 text-center md:pb-20">
      {/* Header */}
      <h1
        className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-6xl"
        data-aos="fade-up"
        id="main-container-header"
      >
        Global Analytics
      </h1>
      <div className="div">
        <ChatBot/>
      </div>
      <h1
        className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-4xl"
        data-aos="fade-up"
      >
        Metrics Right From Our Knowledge Base
      </h1>

      {/* Cards Section */}
      <div className="mt-10 flex flex-col items-center justify-center gap-24 md:flex-row">
        {/* Likes Card */}
        <div className="w-60 h-25 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Likes</h2>
          <p className="mt-4 text-3xl font-bold text-white">27,787</p>
        </div>

        {/* Comments Card */}
        <div className="w-60 h-25 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Comments</h2>
          <p className="mt-4 text-3xl font-bold text-white">8,874</p>
        </div>

        {/* Posts Card */}
        <div className="w-60 h-25 rounded-lg bg-gradient-to-br from-green-500 to-green-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white">Posts</h2>
          <p className="mt-4 text-3xl font-bold text-white">6,002</p>
        </div>
      </div>

      {/* Pie Charts Section */}
      <div className="mt-16 flex flex-col items-center justify-center gap-10 md:flex-row">
        {/* Reels Pie Chart */}
        <div className="w-90 h-90 rounded-lg bg-transparent p-4 shadow-lg border border-gray-300">
          <h3 className="text-lg font-bold text-white">Reels</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reelsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {reelsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Carousel Pie Chart */}
        <div className="w-90 h-90 rounded-lg bg-transparent p-4 shadow-lg border border-gray-300">
          <h3 className="text-lg font-bold text-white">Carousel</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={carouselData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {carouselData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Static Images Pie Chart */}
        <div className="w-90 h-90 rounded-lg bg-transparent p-4 shadow-lg border border-gray-300">
          <h3 className="text-lg font-bold text-white">Static Images</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={staticImagesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {staticImagesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GlobalAnalytics);
