"use client"

import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { 
  ArrowUpCircle, 
  MessageCircle, 
  Clock, 
  Swords,
  Sparkles
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface DebateCardProps {
  id: string
  title: string
  summary: string
  topic: string
  likes: number
  comments: number
  createdAt: Date
}

export function DebateCard({
  id,
  title,
  summary,
  topic,
  likes,
  comments,
  createdAt
}: DebateCardProps) {
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })
  
  return (
    <Card className="mb-4 overflow-hidden transform transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] border-2 border-white dark:border-white/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Link href={`/debate/${id}`} className="text-xl font-semibold hover:text-orange-500 transition-colors cursor-pointer">{title}</Link>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Swords className="h-4 w-4 mr-1" />
            <span className="mr-4">active debate</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 mr-1" />
            <span className="mr-4">{topic}</span>
          </div>
          <Clock className="h-4 w-4 mr-1" />
          <span>{timeAgo}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{summary}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <ArrowUpCircle className="h-4 w-4 mr-1" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/debate/${id}`} className="text-orange-500 hover:text-orange-600">read debate →</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
