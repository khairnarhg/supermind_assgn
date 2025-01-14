"use client"

import { useState, useEffect } from "react"
import MetricsOverview from "@/components/MetricsOverview"
import EngagementChart from "@/components/EngagementChart"
import PostTypeBreakdown from "@/components/PostTypeBreakdown"
import EngagementTrend from "@/components/EngagementTrend"
import PostPerformance from "@/components/PostPerformance"

export default function Page() {
    const [activeTab, setActiveTab] = useState("overview")
    const [metrics, setMetrics] = useState({
        likes: 0, shares: 0, comments: 0, posts: 0, followers: 0, reach: 0
    })
    const [postTypes, setPostTypes] = useState([
        { type: "reel", count: 0 },
        { type: "carousel", count: 0 },
        { type: "post", count: 0 },
    ])
    const [engagementHistory, setEngagementHistory] = useState([])

    useEffect(() => {
        // Simulating real-time updates
        const interval = setInterval(() => {
            const newMetrics = {
                likes: Math.floor(Math.random() * 100),
                shares: Math.floor(Math.random() * 150),
                comments: Math.floor(Math.random() * 100),
                posts: Math.floor(Math.random() * 5),
                followers: Math.floor(Math.random() * 100),
                reach: Math.floor(Math.random() * 500),
            }
            setMetrics(newMetrics)
            setEngagementHistory(prev => [...prev, newMetrics].slice(-30))

            setPostTypes(prev =>
                prev.map(pt => ({
                    ...pt,
                    count: pt.count + (Math.random() > 0.7 ? 1 : 0)
                }))
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <>
                        <div className='flex flex-col items-center justify-center p-5'>

                            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl self-center">
                                Real Time Analytics
                            </h2>

                        </div>
                        <MetricsOverview metrics={metrics} />
                        <div className='flex flex-col gap-5'>
                            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                                <EngagementChart metrics={metrics} />
                                {/* <PostTypeBreakdown postTypes={postTypes} /> */}
                                <PostPerformance postTypes={postTypes} />
                            </div>
                            <EngagementTrend engagementHistory={engagementHistory} />

                        </div>
                    </>
                )

            case "contentAnalytics":
                return <ContentAnalytics />
            default:
                return <div className="text-gray-300">Select a tab</div>
        }
    }

    return (
        <div className="flex h-screen bg-gray-900">
            <div className="flex-1 p-6 space-y-6 overflow-auto bg-#030712shadow-xl rounded-l-xl">
                <div className="transition-all duration-300">{renderContent()}</div>
            </div>
        </div>
    )
}



