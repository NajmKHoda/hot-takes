"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

import { HotTakesLogo } from "@/components/hot-takes-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedBackground } from "@/components/animated-background"

export default function NewDebatePage() {
  const [debateForm, setDebateForm] = useState({
    title: "",
    summary: "",
    initialMessage: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setDebateForm({
      ...debateForm,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to the home page
      window.location.href = "/home"
    }, 1500)
  }

  const isFormValid = () => {
    return (
      debateForm.title.trim() !== "" &&
      debateForm.summary.trim() !== "" &&
      debateForm.initialMessage.trim() !== ""
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/home">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <HotTakesLogo className="h-7" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">start a new debate</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">debate title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="enter a clear, engaging title for your debate"
                  value={debateForm.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">summary</Label>
                <textarea
                  id="summary"
                  name="summary"
                  className="w-full min-h-20 p-3 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="a brief summary explaining what the debate is about"
                  value={debateForm.summary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialMessage">your opening statement</Label>
                <textarea
                  id="initialMessage"
                  name="initialMessage"
                  className="w-full min-h-32 p-3 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="start the debate with your opening statement or argument..."
                  value={debateForm.initialMessage}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      creating debate...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-4 w-4" />
                      publish debate
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
