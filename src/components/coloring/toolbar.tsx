'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Paintbrush, Eraser, RotateCcw, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolbarProps {
    color: string
    setColor: (color: string) => void
    brushSize: number
    setBrushSize: (size: number) => void
    isEraser: boolean
    setIsEraser: (isEraser: boolean) => void
    onClear: () => void
    onDownload: () => void
}

const COLORS = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', // Rainbow
    '#FFC0CB', '#A52A2A', '#808080', '#000000', '#FFFFFF', // Others
    '#FFD700', '#C0C0C0', '#40E0D0', '#FF69B4' // Fun colors
]

export function Toolbar({
    color,
    setColor,
    brushSize,
    setBrushSize,
    isEraser,
    setIsEraser,
    onClear,
    onDownload
}: ToolbarProps) {
    return (
        <div className="flex flex-col gap-6 p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-xl w-full md:w-64">
            {/* Tools */}
            <div className="space-y-4">
                <h3 className="font-bold text-purple-800 text-sm uppercase tracking-wider">Tools</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant={!isEraser ? "default" : "outline"}
                        className={cn(
                            "w-full justify-start",
                            !isEraser ? "bg-purple-600 hover:bg-purple-700" : "text-purple-600 border-purple-200"
                        )}
                        onClick={() => setIsEraser(false)}
                    >
                        <Paintbrush className="mr-2 h-4 w-4" />
                        Brush
                    </Button>
                    <Button
                        variant={isEraser ? "default" : "outline"}
                        className={cn(
                            "w-full justify-start",
                            isEraser ? "bg-purple-600 hover:bg-purple-700" : "text-purple-600 border-purple-200"
                        )}
                        onClick={() => setIsEraser(true)}
                    >
                        <Eraser className="mr-2 h-4 w-4" />
                        Eraser
                    </Button>
                </div>
            </div>

            {/* Brush Size */}
            <div className="space-y-4">
                <h3 className="font-bold text-purple-800 text-sm uppercase tracking-wider">Size</h3>
                <Slider
                    value={[brushSize]}
                    onValueChange={(value) => setBrushSize(value[0])}
                    min={2}
                    max={50}
                    step={1}
                    className="py-4"
                />
            </div>

            {/* Colors */}
            <div className="space-y-4">
                <h3 className="font-bold text-purple-800 text-sm uppercase tracking-wider">Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400",
                                color === c && !isEraser ? "border-purple-600 scale-110 shadow-md" : "border-transparent"
                            )}
                            style={{ backgroundColor: c }}
                            onClick={() => {
                                setColor(c)
                                setIsEraser(false)
                            }}
                            aria-label={`Select color ${c}`}
                        />
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-purple-100">
                <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                    onClick={onClear}
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Clear All
                </Button>
                <Button
                    variant="outline"
                    className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50"
                    onClick={onDownload}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Save Art
                </Button>
            </div>
        </div>
    )
}
