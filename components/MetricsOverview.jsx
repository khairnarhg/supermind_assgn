import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, ThumbsUp, Share2, MessageCircle, Users, Eye, Calendar } from "lucide-react"

const iconMap = {
  likes: ThumbsUp,
  shares: Share2,
  comments: MessageCircle,
  posts: Calendar,
  followers: Users,
  reach: Eye,
}

export function MetricsOverview({ metrics }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {Object.entries(metrics).map(([key, value]) => {
        const Icon = iconMap[key] || Eye
        return (
          <Card key={key} className="overflow-hidden shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon className="text-blue-500" size={24} />
                {Math.random() > 0.5 ? (
                  <TrendingUp className="text-green-500" size={20} />
                ) : (
                  <TrendingDown className="text-red-500" size={20} />
                )}
              </div>
              <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
              <p className="mt-1 text-sm font-medium text-gray-500 capitalize">{key}</p>
              <p className="mt-2 text-xs text-gray-400">
                {Math.random() > 0.5 ? "+" : "-"}{Math.floor(Math.random() * 10)}% from last period
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default MetricsOverview
