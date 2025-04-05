"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Conversation } from './voice-agent';


export default function VoiceAnalysisPage() {
  const router = useRouter();
  const [analysisStage, setAnalysisStage] = useState<'analyzing' | 'speaking' | 'listening'>('analyzing');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // 1. Get the analysis results from session storage (set after video upload)
    const results = JSON.parse(sessionStorage.getItem('videoAnalysisResults') || '{}');
    
    // 2. Generate voice response
    async function generateVoiceResponse() {
      try {
        const response = await fetch('/api/voice-response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: `I've analyzed your video and created a meal plan with ${results.recipes?.length || 0} recipes. Would you like to see the detailed meal plan and shopping list?` 
          })
        });
        
        if (!response.ok) throw new Error('Failed to generate speech');
        
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Play the audio
        const audio = new Audio(url);
        audio.onended = () => {
          setAnalysisStage('listening');
          // In a real implementation, you would start speech recognition here
          
          // For demo, we'll just redirect after a delay
          // setTimeout(() => router.push('/results'), 5000);
        };
        
        setAnalysisStage('speaking');
        audio.play();
      } catch (error) {
        console.error('Error:', error);
        // Fallback to redirect
        // setTimeout(() => router.push('/results'), 3000);
      }
    }
    
    generateVoiceResponse();
    
    return () => {
      // Clean up audio URL when component unmounts
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center">
        
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ElevenLabs Conversational AI
        </h1>
        <Conversation />
      </div>
    </main>

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

