"use client"

import {formatDistanceToNow} from "date-fns"
import Link from "next/link"
import {useState} from "react"
import {ArrowUpCircle, Clock, MessageCircle} from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import { likePost, unlikePost } from '@/lib/actions/likes'

export interface DebateCardProps {
    id: string
    title: string
    summary: string
    topic?: string
    likes: number
    didLike: boolean
    comments: number
    createdAt: Date
}

export function DebateCard({
                               id,
                               title,
                               summary,
                               topic,
                               likes,
                               didLike,
                               comments,
                               createdAt
                           }: DebateCardProps) {
    const timeAgo = formatDistanceToNow(createdAt ?? 0, {addSuffix: true})
    const [likeCount, setLikeCount] = useState(likes)
    const [hasLiked, setHasLiked] = useState(didLike)

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!hasLiked) {
            setLikeCount(prev => prev + 1)
            setHasLiked(true)
            likePost(id)
        } else {
            setLikeCount(prev => prev - 1)
            setHasLiked(false)
            unlikePost(id)
        }
    }

    return (
        <Card
            className="mb-4 overflow-hidden transform transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] border-2 border-white dark:border-white/20">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <Link href={`/debate/${id}`}
                          className="text-xl font-semibold hover:text-orange-500 transition-colors cursor-pointer">{title}</Link>
                </div>
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1"/>
                    <span>{timeAgo}</span>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm line-clamp-3">{summary}</p>
            </CardContent>
            <CardFooter className="pt-2 text-xs text-muted-foreground flex items-center">
                <div
                    className="flex items-center cursor-pointer hover:text-orange-500 transition-colors"
                    onClick={handleLike}
                >
                    <ArrowUpCircle
                        className={`h-4 w-4 mr-1 ${hasLiked ? 'text-orange-500' : ''}`}
                    />
                    <span className={`mr-4 ${hasLiked ? 'text-orange-500' : ''}`}>{likeCount}</span>
                </div>
                <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1"/>
                    <span>{comments}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
