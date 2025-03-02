"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Flame, 
  TrendingUp, 
  Clock, 
  Filter, 
  User,
  Search,
  Zap,
  PlusCircle
} from "lucide-react"

import { HotTakesLogo } from "@/components/hot-takes-logo"
import { DebateCard } from "@/components/debate-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
import { mockDebates } from "@/data/mock-debates"
import { AnimatedBackground } from "@/components/animated-background"


type SortOption = "popular" | "recent" | "trending"

export default function HomePage() {
  const [sortOption, setSortOption] = useState<SortOption>("popular")
  const [sortedDebates, setSortedDebates] = useState(mockDebates)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  
  // Filter and sort debates based on search query and selected option
  useEffect(() => {
    let filtered = [...mockDebates]
    
    // Filter by search query if one exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(debate => 
        debate.title.toLowerCase().includes(query) || 
        debate.summary.toLowerCase().includes(query)
      )
    }
    
    // Sort the filtered debates
    
    if (sortOption === "popular") {
      filtered.sort((a, b) => b.likes - a.likes)
    } else if (sortOption === "recent") {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    } else if (sortOption === "trending") {
      // Trending combines recency and popularity
      filtered.sort((a, b) => {
        const recencyScoreA = Date.now() - a.createdAt.getTime()
        const recencyScoreB = Date.now() - b.createdAt.getTime()
        const popularityScoreA = a.likes + a.comments * 2  // Comments weighted more for "trending"
        const popularityScoreB = b.likes + b.comments * 2
        
        // Lower recency score (more recent) is better
        const scoreA = popularityScoreA / (Math.sqrt(recencyScoreA))
        const scoreB = popularityScoreB / (Math.sqrt(recencyScoreB))
        
        return scoreB - scoreA
      })
    }
    
    setSortedDebates(filtered)
  }, [sortOption, searchQuery])
  
  const { visibleData, isLoading, hasMore } = useInfiniteScroll({
    data: sortedDebates,
    initialItemsToShow: 4,
    incrementBy: 2
  })

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="hidden sm:block">
            <HotTakesLogo className="h-8" />
          </div>
          
          <div className="flex-1 flex justify-center items-center px-4 sm:px-8 max-w-xl mx-auto">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search debates..."
                className="pl-12 h-12 rounded-full border-2 text-base shadow-sm focus-visible:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="sm:hidden">
            <HotTakesLogo className="h-7" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white hidden sm:flex"
              size="sm"
              asChild
            >
              <Link href="/rapid-fire">
                <Zap className="mr-1 h-4 w-4" />
                rapid fire
              </Link>
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white hidden sm:flex"
              size="sm"
              asChild
            >
              <Link href="/new-debate">
                <PlusCircle className="mr-1 h-4 w-4" />
                new debate
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile action buttons */}
      <div className="sm:hidden py-2 px-4 border-b grid grid-cols-2 gap-2">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white w-full"
          asChild
        >
          <Link href="/rapid-fire">
            <Zap className="mr-1 h-4 w-4" />
            rapid fire debates
          </Link>
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white w-full"
          asChild
        >
          <Link href="/new-debate">
            <PlusCircle className="mr-1 h-4 w-4" />
            new debate
          </Link>
        </Button>
      </div>
      
      {/* Mobile search - only shown when toggle is activated */}
      {showMobileSearch && (
        <div className="container mx-auto px-4 py-3 sm:hidden border-b">
          <div className="relative max-w-full mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search debates..."
              className="pl-12 h-12 rounded-full border-2 text-base shadow-sm w-full focus-visible:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">hot debates</h1>
          
          <div className="flex space-x-2">
            <Button 
              variant={sortOption === "popular" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("popular")}
              className={sortOption === "popular" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              <Flame className="mr-1 h-4 w-4" />
              popular
            </Button>
            <Button 
              variant={sortOption === "trending" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("trending")}
              className={sortOption === "trending" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              <TrendingUp className="mr-1 h-4 w-4" />
              trending
            </Button>
            <Button 
              variant={sortOption === "recent" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("recent")}
              className={sortOption === "recent" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              <Clock className="mr-1 h-4 w-4" />
              recent
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {visibleData.map((debate, index) => (
            <DebateCard
              key={debate.uniqueId || `${debate.id}-${index}`}
              id={debate.id}
              title={debate.title}
              summary={debate.summary}
              likes={debate.likes}
              comments={debate.comments}
              createdAt={debate.createdAt}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-pulse text-center text-muted-foreground">
                loading more debates...
              </div>
            </div>
          )}
          
          {!hasMore && !isLoading && visibleData.length > 0 && (
            <div className="text-center py-4 text-muted-foreground">
              you've reached the end
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
