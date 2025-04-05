'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Conversation() {
  const [isBrowserReady, setIsBrowserReady] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      setIsStarting(false);
    },
    onDisconnect: () => {
      console.log('Disconnected');
      cleanupMediaStream();
    },
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => {
      console.error('Error:', error);
      setIsStarting(false);
    },
  });

  // Check browser compatibility on mount
  useEffect(() => {
    setIsBrowserReady(typeof window !== 'undefined' && !!navigator.mediaDevices);
  }, []);

  // Auto-start conversation when ready
  useEffect(() => {
    if (isBrowserReady) {
      startConversation();
    }
  }, [isBrowserReady]);

  const cleanupMediaStream = useCallback(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  }, [mediaStream]);

  const startConversation = useCallback(async () => {
    if (!isBrowserReady || isStarting) return;

    setIsStarting(true);
    console.log('Starting conversation...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      setMediaStream(stream);
      
      await conversation.startSession({
        agentId: 'BJO1v01X6D9XOuo78Vkd',
      });
    } catch (error) {
      console.error('Failed to start:', error);
      setIsStarting(false);
      cleanupMediaStream();
    }
  }, [isBrowserReady, isStarting, conversation, cleanupMediaStream]);

  const stopConversation = useCallback(async () => {
    console.log('Attempting to stop conversation...');
    
    try {
      // Only try to end if actually connected
      if (conversation.status === 'connected') {
        await conversation.endSession();
        console.log('Successfully stopped conversation');
      }
      
      cleanupMediaStream();
      router.push('/results');
    } catch (error) {
      console.error('Failed to stop:', error);
      // Force cleanup if normal stop fails
      cleanupMediaStream();
      router.push('/results');
    }
  }, [conversation, cleanupMediaStream, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupMediaStream();
    };
  }, [cleanupMediaStream]);

  if (!isBrowserReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-center">
          <p className="text-lg">Initializing voice agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      {/* Microphone Status Indicator */}
      <div className={`w-32 h-32 rounded-full flex items-center justify-center 
        ${conversation.status === 'connected' ? 'bg-green-100' : 'bg-blue-100'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-16 h-16 ${conversation.status === 'connected' ? 'text-green-600' : 'text-blue-600'}`}
        >
          <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
          <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
        </svg>
      </div>

      {/* Connection Status */}
      <div className="text-center space-y-2">
        <p className="text-lg font-medium">
          Status: <span className="font-semibold">
            {conversation.status === 'connected' ? 'Active' : 'Disconnected'}
          </span>
        </p>
        <p className="text-lg font-medium">
          Mode: <span className="font-semibold">
            {conversation.isSpeaking ? 'Speaking' : 'Listening'}
          </span>
        </p>
      </div>

      {/* Stop Button - Only shown when active */}
      {conversation.status === 'connected' && (
        <button
          onClick={stopConversation}
          disabled={!conversation.status === 'connected'}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          Stop Conversation
        </button>
      )}

      {/* Loading Indicator */}
      {isStarting && (
        <p className="text-blue-600">Starting conversation...</p>
      )}
    </div>
  );
}