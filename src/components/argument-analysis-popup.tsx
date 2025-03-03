"use client"

import React from "react"
import { Shield, Flame, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FallacyItem {
  name: string
  description: string
  probability: number
  examples: string[]
}

interface FactCheckItem {
  statement: string
  accurate: boolean
  explanation: string
  source?: string
}

interface ArgumentAnalysisProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  argumentText: string
  side: "defend" | "destroy"
  // Placeholder for future Gemini integration
  fallacies?: FallacyItem[]
  factChecks?: FactCheckItem[]
}

export function ArgumentAnalysisPopup({
  isOpen,
  onClose,
  onConfirm,
  argumentText,
  side,
  fallacies = [],
  factChecks = []
}: ArgumentAnalysisProps) {
  // Mock data for UI demonstration - will be replaced by Gemini integration
  const mockFallacies: FallacyItem[] = fallacies.length > 0 ? fallacies : [
    {
      name: "Appeal to Emotion",
      description: "Using emotional language to manipulate an audience's feelings instead of using valid reasoning.",
      probability: 0.85,
      examples: ["Your argument relies heavily on emotional language."]
    },
    {
      name: "False Dichotomy",
      description: "Presenting only two alternatives when more exist.",
      probability: 0.65,
      examples: ["You present only two possible outcomes when there may be others."]
    }
  ]

  const mockFactChecks: FactCheckItem[] = factChecks.length > 0 ? factChecks : [
    {
      statement: "Part of your argument contains inaccurate information.",
      accurate: false,
      explanation: "The statistics cited don't match current research findings.",
      source: "Example source"
    },
    {
      statement: "Your main claim appears to be supported by evidence.",
      accurate: true,
      explanation: "The core premise is generally consistent with available data.",
      source: "Example source"
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-black text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            {side === "defend" ? (
              <Shield className="mr-2 h-5 w-5 text-blue-500" />
            ) : (
              <Flame className="mr-2 h-5 w-5 text-red-500" />
            )}
            <span className={side === "defend" ? "text-blue-500" : "text-red-500"}>
              Argument Analysis
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            AI analysis of your argument for logical fallacies and factual accuracy
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-gray-900 p-4 rounded-md text-sm mb-6">
            <h3 className="font-medium mb-2 text-gray-300">Your Argument:</h3>
            <p className="italic text-white">{argumentText}</p>
          </div>

          {/* Logical Fallacies Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg flex items-center mb-3 text-white">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Potential Logical Fallacies
            </h3>
            <div className="space-y-4">
              {mockFallacies.map((fallacy, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-amber-400">
                      {fallacy.name}
                    </h4>
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-amber-900 text-amber-400">
                      {Math.round(fallacy.probability * 100)}% likely
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-gray-400">{fallacy.description}</p>
                  <div className="mt-3 text-sm text-gray-300">
                    <strong>Detection:</strong>
                    <ul className="list-disc list-inside mt-1 ml-2 space-y-1 text-gray-400">
                      {fallacy.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {mockFallacies.length === 0 && (
                <div className="bg-gray-800 p-4 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-gray-300">No significant logical fallacies detected in your argument.</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6 bg-gray-700" />

          {/* Fact Checking Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg flex items-center mb-3 text-white">
              <Info className="mr-2 h-5 w-5 text-blue-500" />
              Fact Checking Results
            </h3>
            <div className="space-y-4">
              {mockFactChecks.map((fact, index) => (
                <div key={index} className="p-4 rounded-md border border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    {fact.accurate ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-white">{fact.statement}</p>
                      <p className="text-sm mt-1 text-gray-400">{fact.explanation}</p>
                      {fact.source && (
                        <p className="text-xs mt-2 text-gray-500">
                          <span className="font-medium text-gray-400">Source:</span> {fact.source}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Close
            </Button>
            <Button 
              onClick={onConfirm}
              className={side === "defend" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"}
            >
              Proceed with Submission
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
