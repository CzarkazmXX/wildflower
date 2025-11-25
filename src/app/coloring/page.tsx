import { ColoringInterface } from '@/components/coloring/coloring-interface'
import { Badge } from '@/components/ui/badge'
import { Flower } from 'lucide-react'

export default function ColoringPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50">
            {/* Navigation (Simplified for this page) */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Flower className="h-8 w-8 text-purple-600" />
                            <a href="/" className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Pouneh Wildflower
                            </a>
                        </div>
                        <a href="/" className="text-gray-600 hover:text-purple-600 font-medium">
                            Back to Home
                        </a>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-pink-100 text-pink-800">🎨 Magic Coloring Book</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Let's Color Together!
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Pick your favorite colors and bring these magical friends to life.
                    </p>
                </div>

                <ColoringInterface />
            </main>
        </div>
    )
}
