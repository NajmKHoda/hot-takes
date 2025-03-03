"use client"

import React, {useEffect, useState} from "react"
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
import Gemini from "@/lib/gemini/gemini";
import {analyze} from "@/lib/actions/gemini";

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
}: ArgumentAnalysisProps) {
  const [response, setResponse] = useState<string|null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (response === null && !loading) {
      setLoading(true)
      analyze(argumentText).then((res) => {
        setResponse(res)
        setLoading(false)
      })
    }
  }, [argumentText])

  if (response === null) return;

  const str = response.replace('```json', '').replaceAll('\n', '').replace("[]", "").replace('```', '').trim()
  const obj = str.length == 0 ? [] : JSON.parse(str)
  const fallacyItems = obj && obj.length ? obj : [{
    name: "No Fallacies Found!",
    description: "Nice job! You presented a sound argument."
  }]

  if (loading) return <></>;

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
              {fallacyItems.map((fallacy, index) => (
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
                      {fallacy.examples?.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {fallacyItems.length === 0 && (
                <div className="bg-gray-800 p-4 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-gray-300">No significant logical fallacies detected in your argument.</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6 bg-gray-700" />

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
