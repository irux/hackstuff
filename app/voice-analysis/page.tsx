"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Mic, AudioWaveformIcon as Waveform } from "lucide-react"

export default function VoiceAnalysisPage() {
  const router = useRouter()
  const [analysisStage, setAnalysisStage] = useState<"analyzing" | "speaking" | "listening">("analyzing")
  const [transcript, setTranscript] = useState<string>("")
  const [progress, setProgress] = useState(0)

  // Simulate the analysis and voice interaction
  useEffect(() => {
    // First stage: Analyzing the video
    const analyzeTimer = setTimeout(() => {
      setAnalysisStage("speaking")
      setTranscript(
        "I've analyzed your video and created a meal plan for the week. I've included vegetable stir fry, grilled chicken salad, and pasta primavera. Would you like to see the detailed meal plan and shopping list?",
      )

      // Start the speaking animation
      const speakingTimer = setTimeout(() => {
        setAnalysisStage("listening")

        // Simulate waiting for user response and then redirect
        const redirectTimer = setTimeout(() => {
          router.push("/results")
        }, 5000)

        return () => clearTimeout(redirectTimer)
      }, 6000)

      return () => clearTimeout(speakingTimer)
    }, 3000)

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => {
      clearTimeout(analyzeTimer)
      clearInterval(progressInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {analysisStage === "analyzing" ? (
              <Mic className="h-12 w-12 text-green-600" />
            ) : (
              <div className="relative">
                <Mic className="h-12 w-12 text-green-600" />
                {analysisStage === "speaking" && (
                  <div className="absolute -right-4 -top-4">
                    <Waveform className="h-6 w-6 text-green-600 animate-pulse" />
                  </div>
                )}
                {analysisStage === "listening" && (
                  <div className="absolute -right-4 -top-4">
                    <div className="flex space-x-1">
                      <div
                        className="w-1 h-1 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {analysisStage === "analyzing"
              ? "Analyzing Your Video"
              : analysisStage === "speaking"
                ? "AI Assistant Speaking"
                : "Listening..."}
          </h2>

          {analysisStage === "analyzing" && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <p className="text-gray-600">
            {analysisStage === "analyzing"
              ? "Our AI is processing your video to create personalized meal suggestions..."
              : transcript}
          </p>
        </div>

        <div className="text-sm text-gray-500 mt-8">
          <p>Powered by 11 Labs Voice AI</p>
          <p className="mt-2">
            {analysisStage === "listening" ? 'Say "Yes" to continue or "No" to regenerate suggestions' : ""}
          </p>
        </div>
      </Card>
    </div>
  )
}

