"use client"

import React, {useEffect, useState} from "react"
import { Shield, Flame, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {analyze} from "@/lib/actions/gemini";

interface FallacyItem {
  name: string
  description: string
  probability: number
  examples: string[]
}

interface ArgumentAnalysisProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  argumentText: string
  side: "defend" | "destroy"
}

export function ArgumentAnalysisPopup({
  isOpen,
  onClose,
  onConfirm,
  argumentText,
  side,
}: ArgumentAnalysisProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [fallacyItems, setFallacyItems] = useState<FallacyItem[]>([])
  const [error, setError] = useState<string|null>(null)

  // Reset state when the dialog opens with new text
  useEffect(() => {
    if (isOpen && argumentText) {
      setLoading(true)
      setFallacyItems([])
      setError(null)
      
      // Call the Gemini API to analyze the argument
      analyze(argumentText)
        .then((res) => {
          try {
            // Clean up the response and parse the JSON
            const cleanedResponse = res
              .replace(/```json|```/g, '') // Remove markdown code blocks
              .replace(/\n/g, '')          // Remove newlines
              .trim();
              
            // Parse the JSON response
            if (cleanedResponse && cleanedResponse !== '[]') {
              const parsedFallacies = JSON.parse(cleanedResponse);
              setFallacyItems(Array.isArray(parsedFallacies) ? parsedFallacies : []);
            } else {
              // No fallacies found
              setFallacyItems([]);
            }
          } catch (err) {
            console.error('Error parsing fallacy response:', err, res);
            setError('Failed to parse analysis results');
            setFallacyItems([]);
          }
        })
        .catch((err) => {
          console.error('Error analyzing argument:', err);
          setError('Failed to analyze argument');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, argumentText]);

  if (!isOpen) return null;

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
            AI analysis of your argument for logical fallacies
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
            
            {loading && (
              <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Analyzing your argument...</p>
              </div>
            )}
            
            {error && !loading && (
              <div className="bg-red-900/30 border border-red-800 p-4 rounded-md text-red-200">
                <p className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {error}
                </p>
                <p className="text-sm mt-2">Your argument will still be submitted, but we couldn&apos;t analyze it for fallacies.</p>
              </div>
            )}
            
            {!loading && !error && (
              <div className="space-y-4">
                {fallacyItems.length > 0 ? (
                  fallacyItems.map((fallacy, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-amber-400">
                          {fallacy.name}
                        </h4>
                        {fallacy.probability && (
                          <div className="text-xs font-medium px-2 py-1 rounded-full bg-amber-900 text-amber-400">
                            {Math.round((fallacy.probability || 0) * 100)}% likely
                          </div>
                        )}
                      </div>
                      <p className="text-sm mt-2 text-gray-400">{fallacy.description}</p>
                      {fallacy.examples && fallacy.examples.length > 0 && (
                        <div className="mt-3 text-sm text-gray-300">
                          <strong>Detected in:</strong>
                          <ul className="list-disc list-inside mt-1 ml-2 space-y-1 text-gray-400">
                            {fallacy.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-green-900/30 border border-green-800 p-4 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">No significant logical fallacies detected in your argument.</p>
                      <p className="text-sm mt-1 text-gray-400">Your argument appears to be logically sound.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Proceed with Submission"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
