"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  User, 
  Settings, 
  Edit, 
  Home,
  LogOut
} from "lucide-react"

import { HotTakesLogo } from "@/components/hot-takes-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedBackground } from "@/components/animated-background"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    username: "gsag",
    email: "gsag@ucla.edu",
    bio: "GGs Im cooked",
    joined: "March 2025",
    debatesParticipated: 8,
    debatesWon: 5
  })
  const [settings, setSettings] = useState({
    notifications: true,
    privacy: false
  })

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // In a real app, you would save changes to the backend here
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/home">
            <HotTakesLogo className="h-8" />
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/home">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">your profile</h1>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              edit profile
            </Button>
          )}
        </div>
        
        <div className="bg-card border rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
                <div className="w-32 h-32 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <User className="h-16 w-16 text-orange-500" />
                </div>
                <h2 className="text-lg font-semibold">{userProfile.username}</h2>
                <p className="text-sm text-muted-foreground">Joined {userProfile.joined}</p>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="text-center p-3 bg-background rounded-md border">
                    <p className="text-sm text-muted-foreground">Debates</p>
                    <p className="text-xl font-bold">{userProfile.debatesParticipated}</p>
                  </div>
                  <div className="text-center p-3 bg-background rounded-md border">
                    <p className="text-sm text-muted-foreground">Won</p>
                    <p className="text-xl font-bold">{userProfile.debatesWon}</p>
                  </div>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-auto hidden md:block" />
              <Separator className="my-4 md:hidden" />
              
              <div className="w-full md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">username</Label>
                      <Input 
                        id="username" 
                        value={userProfile.username}
                        onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-24 p-2 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" className="bg-orange-500 hover:bg-orange-600">save changes</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>cancel</Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                      <p>{userProfile.username}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{userProfile.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                      <p className="whitespace-pre-wrap">{userProfile.bio}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="debates">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="debates">your debates</TabsTrigger>
              <TabsTrigger value="settings">account settings</TabsTrigger>
            </TabsList>
            <TabsContent value="debates" className="mt-4">
              <div className="bg-card border rounded-lg p-6">
                <p className="text-center text-muted-foreground py-8">
                  you haven&apos;t participated in any debates yet.
                  <br />
                  <Link href="/home" className="text-orange-500 hover:underline mt-2 inline-block">
                    find a debate to join
                  </Link>
                </p>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <div className="bg-card border rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">account settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">notifications</p>
                        <p className="text-sm text-muted-foreground">Receive email notifications</p>
                      </div>
                      <div 
                        className={`w-12 h-6 ${settings.notifications ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'} rounded-full relative cursor-pointer transition-colors duration-200`}
                        onClick={() => {
                          setSettings({...settings, notifications: !settings.notifications});
                          // In a real app, you would save this setting to the backend
                        }}
                        role="switch"
                        aria-checked={settings.notifications}
                      >
                        <div 
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transform transition-transform duration-200 ${settings.notifications ? 'right-1' : 'left-1'}`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">privacy</p>
                        <p className="text-sm text-muted-foreground">Make profile visible to everyone</p>
                      </div>
                      <div 
                        className={`w-12 h-6 ${settings.privacy ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'} rounded-full relative cursor-pointer transition-colors duration-200`}
                        onClick={() => {
                          setSettings({...settings, privacy: !settings.privacy});
                          // In a real app, you would save this setting to the backend
                        }}
                        role="switch"
                        aria-checked={settings.privacy}
                      >
                        <div 
                          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transform transition-transform duration-200 ${settings.privacy ? 'right-1' : 'left-1'}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">session</h3>
                  <Button asChild className="bg-orange-500 hover:bg-orange-600 mb-6 w-full">
                    <Link href="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      log out
                    </Link>
                  </Button>
                </div>
                

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
