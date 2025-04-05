'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useEffect, useState } from 'react';

export function Conversation() {
  const [isBrowserReady, setIsBrowserReady] = useState(false);
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  // Check for browser environment on mount
  useEffect(() => {
    setIsBrowserReady(typeof window !== 'undefined' && !!navigator.mediaDevices);
  }, []);

  const startConversation = useCallback(async () => {
    if (!isBrowserReady) {
      console.warn('Please wait for browser initialization');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      
      await conversation.startSession({
        agentId: 'tu28ihtc1vttQvc95tsQ', // Replace with your agent ID
      });
      
      // Cleanup stream when conversation ends
      conversation.onDisconnect = () => {
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Microphone access failed:', error);
    }
  }, [conversation, isBrowserReady]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  if (!isBrowserReady) {
    return <div className="p-4 text-center">Initializing microphone...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>

      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}