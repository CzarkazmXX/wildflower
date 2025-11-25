'use client'

import React, { useRef, useEffect, useState } from 'react'

interface CanvasProps {
    templateUrl: string
    color: string
    brushSize: number
    isEraser: boolean
    triggerClear: number // Increment to trigger clear
    onCanvasReady: (canvas: HTMLCanvasElement) => void
}

export function Canvas({
    templateUrl,
    color,
    brushSize,
    isEraser,
    triggerClear,
    onCanvasReady
}: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const lastPos = useRef<{ x: number; y: number } | null>(null)

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Set canvas size to match parent container or a fixed size
        // For now, let's use a fixed size that matches standard paper ratio or the image ratio
        // Ideally, we'd load the image and set canvas size to match

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        onCanvasReady(canvas)
    }, [onCanvasReady])

    // Handle clear
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, [triggerClear])

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return null

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        let clientX, clientY

        if ('touches' in e) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = (e as React.MouseEvent).clientX
            clientY = (e as React.MouseEvent).clientY
        }

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        }
    }

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true)
        const pos = getCoordinates(e)
        if (pos) lastPos.current = pos
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const currentPos = getCoordinates(e)
        if (!currentPos || !lastPos.current) return

        ctx.beginPath()
        ctx.moveTo(lastPos.current.x, lastPos.current.y)
        ctx.lineTo(currentPos.x, currentPos.y)

        ctx.strokeStyle = isEraser ? '#FFFFFF' : color
        ctx.lineWidth = brushSize
        ctx.stroke()

        lastPos.current = currentPos
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        lastPos.current = null
    }

    return (
        <div className="relative w-full max-w-[800px] aspect-[3/4] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border-8 border-white">
            {/* Drawing Layer */}
            <canvas
                ref={canvasRef}
                width={800}
                height={1067} // 3:4 aspect ratio approx
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />

            {/* Template Layer (Top) */}
            <img
                src={templateUrl}
                alt="Coloring Template"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none mix-blend-multiply opacity-90"
            />
        </div>
    )
}
