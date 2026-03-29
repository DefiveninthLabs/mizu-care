"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, RotateCcw, Check, SwitchCamera } from "lucide-react"
import { useI18n } from '@/lib/i18n'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onBack: () => void
}

export default function CameraCapture({ onCapture, onBack }: CameraCaptureProps) {
  const { t } = useI18n()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Camera error:", err)
      setError(t('camera.error'))
    } finally {
      setIsLoading(false)
    }
  }, [facingMode, stream, t])

  useEffect(() => {
    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        if (facingMode === "user") {
          context.translate(canvas.width, 0)
          context.scale(-1, 1)
        }
        context.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        setCapturedImage(imageData)
      }
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
  }

  const handleConfirm = () => {
    if (capturedImage) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      onCapture(capturedImage)
    }
  }

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  return (
    <div className="flex min-h-screen flex-col bg-foreground">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-background hover:bg-background/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-medium text-background">{t('camera.title')}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCamera}
          className="text-background hover:bg-background/10"
        >
          <SwitchCamera className="h-6 w-6" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="relative flex flex-1 items-center justify-center">
        {error ? (
          <div className="px-6 text-center text-background">
            <p className="mb-4">{error}</p>
            <Button onClick={startCamera} variant="secondary">
              {t('camera.retry')}
            </Button>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-background border-t-transparent" />
              </div>
            )}

            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured"
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`h-full w-full object-cover ${
                  facingMode === "user" ? "scale-x-[-1]" : ""
                }`}
                onLoadedMetadata={() => setIsLoading(false)}
              />
            )}

            {!capturedImage && !isLoading && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-72 w-56">
                  <svg
                    viewBox="0 0 200 260"
                    className="h-full w-full"
                    fill="none"
                  >
                    <ellipse
                      cx="100"
                      cy="130"
                      rx="80"
                      ry="110"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="10 5"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <p className="absolute bottom-24 text-sm text-background/80">
                  {t('camera.guide')}
                </p>
              </div>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-8 p-8">
        {capturedImage ? (
          <>
            <Button
              variant="outline"
              size="lg"
              onClick={handleRetake}
              className="h-14 w-14 rounded-full border-background/30 bg-transparent p-0 text-background hover:bg-background/10"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              onClick={handleConfirm}
              className="h-16 w-16 rounded-full bg-primary p-0"
            >
              <Check className="h-8 w-8" />
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            onClick={handleCapture}
            disabled={isLoading || !!error}
            className="h-20 w-20 rounded-full border-4 border-background/30 bg-background p-0 hover:bg-background/90"
          >
            <Camera className="h-8 w-8 text-foreground" />
          </Button>
        )}
      </div>
    </div>
  )
}
