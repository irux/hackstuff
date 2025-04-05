"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Conversation } from '../api/voice-agent';

export default function VoiceAnalysisPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'speaking' | 'listening'>('idle');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center">
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
            <h1 className="text-4xl font-bold text-center">
              EcoDish Voice Agent
            </h1>
            <Conversation />
          </div>
        </main>
      </Card>
    </div>
  )
}