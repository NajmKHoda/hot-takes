"use client"

import {useEffect, useState} from "react"
import {useParams} from "next/navigation"
import Link from "next/link"
import {ArrowLeft, ArrowUpCircle, Clock, Flame, MessageCircle, Send, Shield} from "lucide-react"
import {formatDistanceToNow} from "date-fns"

import {HotTakesLogo} from "@/components/hot-takes-logo"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {AnimatedBackground} from "@/components/animated-background"
import {IMessage, IPost} from "@/lib/database";
import {loadDebate} from "@/lib/actions/newDebate";

export default function DebatePage() {
    const params = useParams()
    const id = params.id as string

    const [debate, setDebate] = useState<IPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState("")
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [activeSide, setActiveSide] = useState<"defend" | "destroy">("defend")
    const [defendMessage, setDefendMessage] = useState("")
    const [destroyMessage, setDestroyMessage] = useState("")

    // Messages for both sides
    const [defendMessages, setDefendMessages] = useState<IMessage[]>([])
    const [destroyMessages, setDestroyMessages] = useState<IMessage[]>([])

    useEffect(() => {
        // In a real app, this would be an API call
        async function load() {
            const foundDebate = await loadDebate(id)

            if (foundDebate) {
                return JSON.parse(foundDebate) as IPost
            } else {
                setError("Debate not found")
            }

            setLoading(false)
        }

        load().then((debate) => {
            if (debate) {
                setDebate(debate)
                //setLikeCount(debate) TODO
                //setDefendMessages(debate.messages.filter(m => m.side === "defend"))
                //setDestroyMessages(debate.messages.filter(m => m.side === "destroy"))
            }
        })
    }, [id])

    const handleSubmitDefend = (e: React.FormEvent) => {
        e.preventDefault()

        if (!defendMessage.trim() || !debate) return
        // TODO HOW TO GET ID
        const newMsg: IMessage = {
            senderId: "",
            contents: defendMessage,
            timestamp: new Date(),
            side: "defend"
        }

        setDefendMessages([...defendMessages, newMsg])
        setDefendMessage("")
    }

    const handleSubmitDestroy = (e: React.FormEvent) => {
        e.preventDefault()

        if (!destroyMessage.trim() || !debate) return

        const newMsg: Message = {
            id: `new-${Date.now()}-destroy`,
            userId: "currentUser",
            content: destroyMessage,
            timestamp: new Date(),
            side: "destroy"
        }

        setDestroyMessages([...destroyMessages, newMsg])
        setDestroyMessage("")
    }

    const handleLike = () => {
        if (!hasLiked) {
            setLikeCount(prev => prev + 1)
            setHasLiked(true)
        } else {
            setLikeCount(prev => prev - 1)
            setHasLiked(false)
        }

        // In a real app, you would make an API call here to update the like count
        // Example: api.updateDebateLikes(id, hasLiked ? 'unlike' : 'like')
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">{error}</div>
    }

    if (!debate) {
        return <div className="min-h-screen flex items-center justify-center">Debate not found</div>
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <AnimatedBackground/>
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" asChild className="mr-2">
                            <Link href="/home">
                                <ArrowLeft className="h-5 w-5"/>
                            </Link>
                        </Button>
                        <HotTakesLogo className="h-7"/>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="bg-card border rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-3">{debate.title}</h1>

                        <div className="flex items-center mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1"/>
                                <span className="mr-4">{formatDistanceToNow(debate.createdAt, {addSuffix: true})}</span>
                            </div>
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
                                <span>{debate.comments}</span>
                            </div>
                        </div>

                        <p className="mb-4">{debate.summary}</p>

                        <Separator className="my-4"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Defend Side */}
                            <div className="space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                                    <h2 className="font-semibold flex items-center text-blue-600 dark:text-blue-400 mb-2">
                                        <Shield className="mr-2 h-4 w-4"/>
                                        DEFEND THIS TAKE
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Arguments that support the hot take. Make your case for why this position is
                                        correct.
                                    </p>
                                </div>

                                <div className="overflow-y-auto max-h-[500px] space-y-3 pr-2">
                                    {defendMessages.map(message => (
                                        <div key={message.id} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <Avatar className="h-8 w-8 mr-3">
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-1">
                                                        <p className="font-medium text-sm mr-2">User</p>
                                                        <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(message.timestamp, {addSuffix: true})}
                            </span>
                                                    </div>
                                                    <p className="text-sm">{message.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmitDefend} className="pt-2">
                                    <div className="flex space-x-2">
                    <textarea
                        className="flex-1 p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24 text-sm resize-none"
                        placeholder="Add your argument to defend this take..."
                        value={defendMessage}
                        onChange={(e) => setDefendMessage(e.target.value)}
                    />
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600"
                                            disabled={!defendMessage.trim()}
                                        >
                                            <Send className="mr-2 h-4 w-4"/>
                                            DEFEND
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            {/* Destroy Side */}
                            <div className="space-y-4">
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                                    <h2 className="font-semibold flex items-center text-red-600 dark:text-red-400 mb-2">
                                        <Flame className="mr-2 h-4 w-4"/>
                                        DESTROY THIS TAKE
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Arguments that challenge the hot take. Explain why this position is flawed or
                                        incorrect.
                                    </p>
                                </div>

                                <div className="overflow-y-auto max-h-[500px] space-y-3 pr-2">
                                    {destroyMessages.map(message => (
                                        <div key={message.id} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <Avatar className="h-8 w-8 mr-3">
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-1">
                                                        <p className="font-medium text-sm mr-2">User</p>
                                                        <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(message.timestamp, {addSuffix: true})}
                            </span>
                                                    </div>
                                                    <p className="text-sm">{message.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmitDestroy} className="pt-2">
                                    <div className="flex space-x-2">
                    <textarea
                        className="flex-1 p-3 border rounded-md bg-red-50 dark:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-24 text-sm resize-none"
                        placeholder="Add your argument to destroy this take..."
                        value={destroyMessage}
                        onChange={(e) => setDestroyMessage(e.target.value)}
                    />
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-600"
                                            disabled={!destroyMessage.trim()}
                                        >
                                            <Send className="mr-2 h-4 w-4"/>
                                            DESTROY
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
