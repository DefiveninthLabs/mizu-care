"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, RotateCcw, Check, SwitchCamera, AlertCircle } from "lucide-react"
import { useI18n } from '@/lib/i18n'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onBack: () => void
}

interface FaceDetectionResult {
  detected: boolean
  centered: boolean
  message: string
}

export default function CameraCapture({ onCapture, onBack }: CameraCaptureProps) {
  const { t } = useI18n()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [faceStatus, setFaceStatus] = useState<FaceDetectionResult>({
    detected: false,
    centered: false,
    message: "Position your face in the oval"
  })
  const animationFrameRef = useRef<number | null>(null)

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

  // Face detection using skin tone analysis
  const detectFace = useCallback(() => {
    if (!videoRef.current || !detectionCanvasRef.current || capturedImage) {
      return
    }

    const video = videoRef.current
    const canvas = detectionCanvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    
    if (!ctx || video.readyState !== 4) {
      animationFrameRef.current = requestAnimationFrame(detectFace)
      return
    }

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(video, 0, 0)
    if (facingMode === "user") {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }

    // Define the oval region (center of frame)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const ovalWidth = canvas.width * 0.35
    const ovalHeight = canvas.height * 0.55

    // Sample pixels in the oval region
    const imageData = ctx.getImageData(
      centerX - ovalWidth / 2,
      centerY - ovalHeight / 2,
      ovalWidth,
      ovalHeight
    )
    
    const pixels = imageData.data
    let skinPixels = 0
    let totalPixels = 0
    let avgBrightness = 0

    // Check for skin-tone pixels (simplified skin detection)
    for (let i = 0; i < pixels.length; i += 16) { // Sample every 4th pixel for performance
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      
      totalPixels++
      avgBrightness += (r + g + b) / 3

      // Skin tone detection using RGB rules
      // Works for various skin tones
      if (
        r > 60 && g > 40 && b > 20 &&
        r > g && r > b &&
        Math.abs(r - g) > 15 &&
        r - b > 15 &&
        Math.max(r, g, b) - Math.min(r, g, b) > 15
      ) {
        skinPixels++
      }
    }

    const skinRatio = skinPixels / totalPixels
    avgBrightness = avgBrightness / totalPixels

    // Determine face detection status
    let detected = false
    let centered = false
    let message = ""

    if (avgBrightness < 40) {
      message = "Too dark - move to better lighting"
    } else if (avgBrightness > 240) {
      message = "Too bright - avoid direct light"
    } else if (skinRatio < 0.15) {
      message = "Position your face in the oval"
    } else if (skinRatio < 0.25) {
      detected = true
      message = "Move closer to the camera"
    } else if (skinRatio > 0.7) {
      detected = true
      message = "Move back a little"
    } else {
      detected = true
      centered = true
      message = "Perfect! Hold still and capture"
    }

    setFaceStatus({ detected, centered, message })

    animationFrameRef.current = requestAnimationFrame(detectFace)
  }, [facingMode, capturedImage])

  useEffect(() => {
    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode])

  // Start face detection when video is playing
  useEffect(() => {
    if (!isLoading && !error && !capturedImage) {
      animationFrameRef.current = requestAnimationFrame(detectFace)
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isLoading, error, capturedImage, detectFace])

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
        
        // Stop face detection
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setFaceStatus({
      detected: false,
      centered: false,
      message: "Position your face in the oval"
    })
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

  // Determine oval color based on face status
  const getOvalColor = () => {
    if (faceStatus.centered) return "#22c55e" // Green
    if (faceStatus.detected) return "#eab308" // Yellow
    return "white" // Default
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

            {/* Hidden canvas for face detection */}
            <canvas ref={detectionCanvasRef} className="hidden" />

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
                      stroke={getOvalColor()}
                      strokeWidth="3"
                      strokeDasharray={faceStatus.centered ? "0" : "10 5"}
                      opacity={faceStatus.centered ? "1" : "0.7"}
                      className="transition-all duration-300"
                    />
                    {faceStatus.centered && (
                      <ellipse
                        cx="100"
                        cy="130"
                        rx="80"
                        ry="110"
                        stroke={getOvalColor()}
                        strokeWidth="6"
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}
                  </svg>
                </div>
                
                {/* Face detection status message */}
                <div className="absolute bottom-24 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
                  {!faceStatus.centered && (
                    <AlertCircle className={`h-4 w-4 ${faceStatus.detected ? 'text-yellow-400' : 'text-white'}`} />
                  )}
                  {faceStatus.centered && (
                    <Check className="h-4 w-4 text-green-400" />
                  )}
                  <p className={`text-sm ${faceStatus.centered ? 'text-green-400' : faceStatus.detected ? 'text-yellow-400' : 'text-white'}`}>
                    {faceStatus.message}
                  </p>
                </div>
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
            disabled={isLoading || !!error || !faceStatus.centered}
            className={`h-20 w-20 rounded-full border-4 p-0 transition-all ${
              faceStatus.centered 
                ? "border-green-400 bg-background hover:bg-background/90" 
                : "border-background/30 bg-background/50 cursor-not-allowed"
            }`}
          >
            <Camera className={`h-8 w-8 ${faceStatus.centered ? 'text-foreground' : 'text-foreground/50'}`} />
          </Button>
        )}
      </div>
    </div>
  )
}
