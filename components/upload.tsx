"use client"

import type React from "react"

import { useState } from "react"
import { UploadIcon, Video, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Upload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false)
      window.location.href = "/results"
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card
        className={`border-2 border-dashed p-10 text-center ${
          isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="bg-green-100 p-4 rounded-full">
            <Video className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Upload your cooking video</h3>
          <p className="text-gray-500 mb-4">Drag and drop your video here, or click to browse</p>

          <label className="cursor-pointer">
            <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
            <Button variant="outline" className="gap-2">
              <UploadIcon className="h-4 w-4" />
              Browse files
            </Button>
          </label>

          {file && (
            <div className="mt-4 w-full">
              <p className="text-sm text-gray-600 mb-2">Selected file: {file.name}</p>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Generate Meal Ideas"
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

