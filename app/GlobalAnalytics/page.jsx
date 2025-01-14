"use client";

import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatBot from "./chatbot";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

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
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
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
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              <Legend />
            </PieChart>
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

      <Card className="border-gray-700 ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Get Insights from Our AI-Powered Multilingual Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChatBot />
        </CardContent>
      </Card>

      <h2 className="mt-12 mb-6 text-3xl font-semibold text-center">
        Metrics Right From Our Knowledge Base
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard title="Likes" value="27,787" color="from-blue-600 to-blue-400" />
        <MetricCard title="Comments" value="8,874" color="from-purple-600 to-purple-400" />
        <MetricCard title="Posts" value="6,002" color="from-green-600 to-green-400" />
      </div>

      <h2 className="mt-12 mb-6 text-3xl font-semibold text-center">
        Engagement Breakdown by Content Type
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <PieChartCard title="Reels" data={reelsData} />
        <PieChartCard title="Carousel" data={carouselData} />
        <PieChartCard title="Static Images" data={staticImagesData} />
      </div>
    </div>
  );
}
