"use client";

import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatBot from "./chatbot";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

const overallData = [
  { name: "Likes", value: 118075 },
  { name: "Shares", value: 13064 },
  { name: "Comments", value: 18739 },
];

const carouselData = [
  { name: "Likes", value: 24165 },
  { name: "Shares", value: 2413 },
  { name: "Comments", value: 3648 },
];

const reelsData = [
  { name: "Likes", value: 62655 },
  { name: "Shares", value: 7273 },
  { name: "Comments", value: 10339 },
];

const staticImagesData = [
  { name: "Likes", value: 3000 },
  { name: "Comments", value: 1500 },
  { name: "Shares", value: 700 },
];

// const comparisonData = [
//   { name: "Reels", likes: 62655, comments: 10339, shares: 7273 },
//   { name: "Carousel", likes: 24165, comments: 3648, shares: 2413 },
//   { name: "Static Images", likes: 3000, comments: 1500, shares: 700 },
// ];

const comparisonData = [
  { name: "Likes", Reels: 62655, Carousel: 24165, StaticImages: 3000 },
  { name: "Comments", Reels: 10339, Carousel: 3648, StaticImages: 1500 },
  { name: "Shares", Reels: 7273, Carousel: 2413, StaticImages: 700 },
];


function MetricCard({ title, value, color }) {
  return (
    <Card className={`bg-gradient-to-br ${color}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  );
}

function PieChartCard({ title, data }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', border: 'line', }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function BarChartCard({ title, data }) {
  const chartData = data.map(item => ({
    name: item.name,  // "Likes", "Comments", "Shares"
    Reels: item.Reels,  // Value for Reels
    Carousel: item.Carousel,  // Value for Carousel
    StaticImages: item.StaticImages,  // Value for StaticImages
  }));

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />  {/* Labels for Likes, Comments, Shares */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Reels" fill="#8884d8" name="Reels" />
              <Bar dataKey="Carousel" fill="#82ca9d" name="Carousel" />
              <Bar dataKey="StaticImages" fill="#ffc658" name="StaticImages" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}



export default function GlobalAnalytics() {
  return (
    <div className="min-h-screen p-6 text-gray-100 bg-gray-900">
      <div className='flex items-center justify-center p-5'>
        <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-4xl font-semibold text-transparent md:text-4xl self-center">
          Global Analytics
        </h2>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-100">
            Get Insights from Our AI-Powered Multilingual Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChatBot />
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-6 text-3xl font-semibold text-center" style={{marginTop: '2rem'}}>
          Metrics Right From Our Knowledge Base
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard title="Likes" value="27,787" color="from-blue-600 to-blue-400" />
          <MetricCard title="Comments" value="8,874" color="from-purple-600 to-purple-400" />
          <MetricCard title="Posts" value="6,002" color="from-green-600 to-green-400" />
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-3xl font-semibold text-center" style={{marginTop: '2rem'}}>
          Engagement Breakdown by Content Type
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PieChartCard title="Reels" data={reelsData} />
          <PieChartCard title="Carousel" data={carouselData} />
          <PieChartCard title="Static Images" data={staticImagesData} />
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-3xl font-semibold text-center" style={{marginTop: '2rem'}}>
          Content Type Comparison
        </h2>

        <div className="flex justify-center items-center p-4 ">
          <BarChartCard title="Reach Comparison" data={comparisonData} />
          {/* <BarChartCard title="Comments Comparison" data={comparisonData} />
          <BarChartCard title="Shares Comparison" data={comparisonData} /> */}
        </div>

      </div>
    </div>
  );
}
