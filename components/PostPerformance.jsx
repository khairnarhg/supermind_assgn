// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// export default function PostPerformance({ postTypes }) {
//   const data = postTypes.map(pt => ({
//     name: pt.type,
//     posts: pt.count,
//   }))

//   return (
//     <Card className="h-[400px]">
//       <CardHeader>
//         <CardTitle>Post Performance</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="posts" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }




"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-15", reel: 450, post: 300, carousal: 200 },
  { date: "2024-07-16", reel: 380, post: 420, carousal: 310 },
  { date: "2024-07-17", reel: 520, post: 120, carousal: 400 },
  { date: "2024-07-18", reel: 140, post: 550, carousal: 250 },
  { date: "2024-07-19", reel: 600, post: 350, carousal: 500 },
  { date: "2024-07-20", reel: 480, post: 400, carousal: 450 },
]

const chartConfig = {
  activities: {
    label: "Activities",
  },
  reel: {
    label: "Reel",
    color: "#4A90E2",
  },
  post: {
    label: "Post",
    color: "#E94E77",
  },
  carousal: {
    label: "Carousal",
    color: "#F5A623",
  },
}

export default function PostPerformance() {
  return (
    <Card > 
      <CardHeader>
        <CardTitle>Post Performance</CardTitle>
        <CardDescription>( Last Week )</CardDescription>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} > 
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
              tick={{ fill: "#FFFFFF" }}
            />
            <Bar
              dataKey="reel"
              stackId="a"
              fill="#4A90E2"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="post"
              stackId="a"
              fill="#E94E77"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="carousal"
              stackId="a"
              fill="#F5A623"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="activities" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
              className="bg-[#111827]"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}