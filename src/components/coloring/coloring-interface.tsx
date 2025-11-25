'use client'

import React, { useState, useRef } from 'react'
import { Toolbar } from './toolbar'
import { Canvas } from './canvas'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const TEMPLATES = [
    { id: 'fox', name: 'Super Fox', url: '/coloring-pages/super-fox.png' },
    { id: 'bear', name: 'Bear Detective', url: '/coloring-pages/bear-detective.png' }
]

export function ColoringInterface() {
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0])
    const [color, setColor] = useState('#FF0000')
    const [brushSize, setBrushSize] = useState(10)
    const [isEraser, setIsEraser] = useState(false)
    const [triggerClear, setTriggerClear] = useState(0)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const handleDownload = () => {
        if (!canvasRef.current) return

        // Create a temporary canvas to combine the drawing and the template
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvasRef.current.width
        tempCanvas.height = canvasRef.current.height
        const ctx = tempCanvas.getContext('2d')
        if (!ctx) return

        // Draw white background
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

        // Draw the user's artwork
        ctx.drawImage(canvasRef.current, 0, 0)

        // Draw the template on top (simulating the multiply effect)
        // We need to load the image first
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = selectedTemplate.url
        img.onload = () => {
            // Draw template
            ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height)

            // Download
            const link = document.createElement('a')
            link.download = `my-magical-coloring-${Date.now()}.png`
            link.href = tempCanvas.toDataURL('image/png')
            link.click()
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar */}
            <div className="w-full lg:w-auto space-y-6">
                {/* Template Selector */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-xl p-4 w-full md:w-64">
                    <h3 className="font-bold text-purple-800 text-sm uppercase tracking-wider mb-4">Templates</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {TEMPLATES.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => {
                                    setSelectedTemplate(template)
                                    setTriggerClear(prev => prev + 1) // Clear canvas on template change
                                }}
                                className={`p-2 rounded-lg border-2 transition-all ${selectedTemplate.id === template.id
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-transparent hover:bg-gray-50'
                                    }`}
                            >
                                <img
                                    src={template.url}
                                    alt={template.name}
                                    className="w-full h-20 object-contain mb-2"
                                />
                                <span className="text-xs font-medium text-gray-700 block text-center">{template.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Toolbar
                    color={color}
                    setColor={setColor}
                    brushSize={brushSize}
                    setBrushSize={setBrushSize}
                    isEraser={isEraser}
                    setIsEraser={setIsEraser}
                    onClear={() => setTriggerClear(prev => prev + 1)}
                    onDownload={handleDownload}
                />
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 w-full">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-purple-100 shadow-inner">
                    <div className="text-center mb-6">
                        <Badge className="mb-2 bg-purple-100 text-purple-800">
                            <Sparkles className="mr-1 h-3 w-3" />
                            Creative Mode
                        </Badge>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {selectedTemplate.name}
                        </h2>
                    </div>

                    <Canvas
                        templateUrl={selectedTemplate.url}
                        color={color}
                        brushSize={brushSize}
                        isEraser={isEraser}
                        triggerClear={triggerClear}
                        onCanvasReady={(canvas) => canvasRef.current = canvas}
                    />
                </div>
            </div>
        </div>
    )
}
