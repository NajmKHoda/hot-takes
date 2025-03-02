"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {ArrowLeft, Plus, Send, User, Users, Zap} from "lucide-react"

import {HotTakesLogo} from "@/components/hot-takes-logo"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {AnimatedBackground} from "@/components/animated-background"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

// Sample active debate topics that users can join - each with exactly 1 person waiting
const activeTopics = [
    {
        id: "topic-1",
        title: "Should social media have stricter content moderation?",
        creator: "TechDebater",
        timeWaiting: "3m",
        category: "technology"
    },
    {
        id: "topic-2",
        title: "Is remote work more productive than office work?",
        creator: "WorkLifeBalance",
        timeWaiting: "1m",
        category: "work"
    },
    {
        id: "topic-4",
        title: "Should AI be regulated more strictly?",
        creator: "FutureThinker",
        timeWaiting: "5m",
        category: "technology"
    },
    {
        id: "topic-6",
        title: "Is space tourism ethical given climate change?",
        creator: "StarGazer",
        timeWaiting: "2m",
        category: "environment"
    },
    {
        id: "topic-7",
        title: "Should there be a maximum wage limit?",
        creator: "EqualityNow",
        timeWaiting: "7m",
        category: "economics"
    }
]

// Sample topic suggestions for users creating their own
const topicSuggestions = [
    "Are NFTs a legitimate art form?",
    "Should college education be free?",
    "Is space exploration worth the cost?",
    "Should voting be mandatory?",
    "Is meat consumption ethical in the modern world?",
    "Should billionaires exist?",
    "Do video games cause violence?",
    "Is social media helping or hurting society?"
]

export default function RapidFirePage() {
    const [currentTopic, setCurrentTopic] = useState("")
    const [customTopic, setCustomTopic] = useState("")
    const [selectedExistingTopic, setSelectedExistingTopic] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<{
        id: string
        content: string
        sender: "user" | "opponent"
        timestamp: Date
    }[]>([])
    const [isJoined, setIsJoined] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false)
    const [opponentTyping, setOpponentTyping] = useState(false)
    const [timeLeft, setTimeLeft] = useState(180)
    const [debateStarted, setDebateStarted] = useState(false)
    const [activeTab, setActiveTab] = useState("create")

    // Initialize the custom topic field with a suggestion
    useEffect(() => {
        const randomSuggestion = topicSuggestions[Math.floor(Math.random() * topicSuggestions.length)]
        setCustomTopic(randomSuggestion)
    }, [])

    // Simulated typing indicator and responses
    useEffect(() => {
        if (!isJoined || !debateStarted) return

        // Simulate opponent typing
        const typingTimeout = setTimeout(() => {
            setOpponentTyping(true)

            // Simulate opponent response
            const responseTimeout = setTimeout(() => {
                setOpponentTyping(false)

                const responses = [
                    "I strongly disagree. Here's why...",
                    "That's an interesting point, but have you considered...",
                    "The evidence doesn't support that conclusion because...",
                    "I see your argument, however I think...",
                    "That's a common misconception. Actually...",
                    "While I understand your perspective, I believe..."
                ]

                const randomResponse = responses[Math.floor(Math.random() * responses.length)]

                setMessages(prev => [
                    ...prev,
                    {
                        id: `opponent-${Date.now()}`,
                        content: randomResponse,
                        sender: "opponent",
                        timestamp: new Date()
                    }
                ])
            }, 3000)

            return () => clearTimeout(responseTimeout)
        }, 5000)

        return () => clearTimeout(typingTimeout)
    }, [messages, isJoined, debateStarted])

    // Countdown timer for debate
    useEffect(() => {
        if (!debateStarted) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [debateStarted])

    const createNewTopic = () => {
        if (!customTopic.trim()) return

        setCurrentTopic(customTopic)
        setIsWaiting(true)

        // Simulate finding a match after a short delay
        setTimeout(() => {
            setIsWaiting(false)
            setIsJoined(true)

            // Add welcome message
            setMessages([
                {
                    id: "system-1",
                    content: "You've been matched! Start debating about: " + customTopic,
                    sender: "opponent", // Using opponent for system messages for styling
                    timestamp: new Date()
                }
            ])

            // Start debate timer
            setDebateStarted(true)
        }, 3000) // Simulate 3 second matchmaking
    }

    const joinExistingTopic = () => {
        if (!selectedExistingTopic) return

        const topic = activeTopics.find(t => t.id === selectedExistingTopic)
        if (!topic) return

        setCurrentTopic(topic.title)
        setIsWaiting(true)

        // Simulate finding a match after a short delay
        setTimeout(() => {
            setIsWaiting(false)
            setIsJoined(true)

            // Add welcome message
            setMessages([
                {
                    id: "system-1",
                    content: "You've been matched! Start debating about: " + topic.title,
                    sender: "opponent", // Using opponent for system messages for styling
                    timestamp: new Date()
                }
            ])

            // Start debate timer
            setDebateStarted(true)
        }, 1500) // Faster matching for existing topics
    }

    const sendMessage = () => {
        if (!message.trim()) return

        setMessages(prev => [
            ...prev,
            {
                id: `user-${Date.now()}`,
                content: message,
                sender: "user",
                timestamp: new Date()
            }
        ])

        setMessage("")
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
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

                    <div className="flex items-center">
                        {debateStarted && (
                            <div className="flex items-center mr-4">
                                <div className={`px-3 py-1 rounded-full text-white font-medium text-sm ${
                                    timeLeft < 10 ? "bg-red-500" : "bg-orange-500"
                                }`}>
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/profile">
                                <User className="h-5 w-5"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col container mx-auto max-w-3xl px-4 pb-4">
                {isWaiting ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div
                            className="bg-card border rounded-lg p-6 w-full max-w-md mx-auto shadow-lg space-y-6 text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <Zap className="h-6 w-6 text-orange-500"/>
                                <h1 className="text-2xl font-bold">finding opponent</h1>
                            </div>

                            <div className="p-4 bg-muted rounded-md">
                                <h2 className="font-semibold mb-2">debate topic:</h2>
                                <p className="italic">{currentTopic}</p>
                            </div>

                            <div className="flex justify-center py-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
                                         style={{animationDelay: "0ms"}}></div>
                                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
                                         style={{animationDelay: "150ms"}}></div>
                                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
                                         style={{animationDelay: "300ms"}}></div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Waiting for one more person to join your debate...
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                The debate will begin automatically when someone joins.
                            </p>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsWaiting(false);
                                    setSelectedExistingTopic(null);
                                    setCurrentTopic("");
                                }}
                            >
                                cancel
                            </Button>
                        </div>
                    </div>
                ) : !isJoined ? (
                    <div className="flex-1 flex flex-col pt-6">
                        <div className="bg-card border rounded-lg p-6 w-full max-w-xl mx-auto shadow-lg">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <Zap className="h-6 w-6 text-orange-500"/>
                                <h1 className="text-2xl font-bold">rapid fire</h1>
                            </div>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid grid-cols-2 mb-6">
                                    <TabsTrigger value="create" className="flex items-center">
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Create Topic
                                    </TabsTrigger>
                                    <TabsTrigger value="join" className="flex items-center">
                                        <Users className="mr-2 h-4 w-4"/>
                                        Join Topic
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="create" className="space-y-6">
                                    <div>
                                        <h2 className="text-sm font-medium mb-2">create your own topic:</h2>
                                        <Input
                                            value={customTopic}
                                            onChange={(e) => setCustomTopic(e.target.value)}
                                            placeholder="Type a debate topic question..."
                                            className="mb-2"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Make your topic specific and debatable. Good topics have strong opinions on
                                            both sides.
                                        </p>
                                    </div>

                                    <Button
                                        className="w-full bg-orange-500 hover:bg-orange-600"
                                        size="lg"
                                        onClick={createNewTopic}
                                        disabled={!customTopic.trim()}
                                    >
                                        <Zap className="mr-2 h-4 w-4"/>
                                        start debate with my topic
                                    </Button>
                                </TabsContent>

                                <TabsContent value="join" className="space-y-6">
                                    <div>
                                        <h2 className="text-sm font-medium mb-2">join an active topic:</h2>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Each topic below has exactly 1 person waiting. Join to start the debate
                                            immediately.
                                        </p>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {activeTopics.map(topic => (
                                                <div
                                                    key={topic.id}
                                                    className={`p-3 rounded-lg border-2 cursor-pointer hover:bg-muted transition-colors ${selectedExistingTopic === topic.id ? 'border-orange-500' : 'border-transparent'}`}
                                                    onClick={() => setSelectedExistingTopic(topic.id)}
                                                >
                                                    <div className="flex justify-between">
                                                        <span className="font-medium">{topic.title}</span>
                                                        <span
                                                            className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 px-2 py-0.5 rounded-full">
                              {topic.category}
                            </span>
                                                    </div>
                                                    <div
                                                        className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                                                        <div className="flex items-center">
                                                            <User className="h-3 w-3 mr-1"/>
                                                            <span>{topic.creator} waiting</span>
                                                        </div>
                                                        <div>
                                                            <span>Waiting for {topic.timeWaiting}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-orange-500 hover:bg-orange-600"
                                        size="lg"
                                        onClick={joinExistingTopic}
                                        disabled={!selectedExistingTopic}
                                    >
                                        <Zap className="mr-2 h-4 w-4"/>
                                        join selected topic
                                    </Button>
                                </TabsContent>
                            </Tabs>

                            <div className="mt-6 pt-6 border-t">
                                <p className="text-center text-sm text-muted-foreground">
                                    Rapid fire debates last 3 minutes and require exactly 2 participants.
                                </p>
                                <p className="text-center text-xs text-muted-foreground mt-1">
                                    When you create a topic, you'll wait for one other person to join. When you join a
                                    topic, the debate starts immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="py-4 sticky top-[57px] bg-background/80 backdrop-blur-sm z-10">
                            <div className="bg-muted p-3 rounded-lg">
                                <h2 className="font-semibold text-sm">topic:</h2>
                                <p className="text-sm">{currentTopic}</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto py-2 space-y-4">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                        <Avatar className={`w-8 h-8 ${msg.sender === "user" ? "ml-2" : "mr-2"}`}>
                                            <AvatarFallback>
                                                {msg.sender === "user" ? "ME" : "OP"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div
                                            className={`px-4 py-2 rounded-lg ${
                                                msg.sender === "user"
                                                    ? "bg-orange-500 text-white rounded-tr-none"
                                                    : "bg-muted rounded-tl-none"
                                            }`}
                                        >
                                            <p>{msg.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {opponentTyping && (
                                <div className="flex justify-start">
                                    <div className="flex">
                                        <Avatar className="w-8 h-8 mr-2">
                                            <AvatarFallback>OP</AvatarFallback>
                                        </Avatar>

                                        <div
                                            className="px-4 py-2 rounded-lg bg-muted rounded-tl-none flex items-center">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                     style={{animationDelay: "0ms"}}></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                     style={{animationDelay: "150ms"}}></div>
                                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                     style={{animationDelay: "300ms"}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {timeLeft === 0 && (
                                <div
                                    className="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800 p-4 rounded-lg text-center">
                                    <p className="font-medium">Debate time is up!</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Hope you made your points effectively.
                                    </p>
                                    <Button className="mt-3" size="sm" asChild>
                                        <Link href="/home">
                                            return home
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>

                        {timeLeft > 0 && (
                            <div className="py-4 border-t mt-auto">
                                <div className="flex items-center">
                                    <Input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your argument..."
                                        className="flex-1"
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        disabled={timeLeft === 0}
                                    />
                                    <Button
                                        className="ml-2 bg-orange-500 hover:bg-orange-600"
                                        size="icon"
                                        onClick={sendMessage}
                                        disabled={timeLeft === 0 || !message.trim()}
                                    >
                                        <Send className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}
