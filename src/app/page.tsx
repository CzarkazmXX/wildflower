'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, BookOpen, Mail, Heart, Sparkles, Rabbit, Flower, Camera, Video } from 'lucide-react'
import '@/styles/magical.css'
import { MediaGallery, sampleMediaItems } from '@/components/media-gallery'
import { HeroMedia } from '@/components/hero-media'
import { ContactForm } from '@/components/contact-form'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 15,
    animationDuration: 15 + Math.random() * 10
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 overflow-hidden relative">
      {/* Floating magical particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>
      {/* Magical Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Flower className="h-8 w-8 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pouneh Wildflower
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
              <a href="#books" className="text-gray-700 hover:text-purple-600 transition-colors">Books</a>
              <a href="/coloring" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Coloring Book</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background with parallax effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-pink-900/20 z-10" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <Rabbit className="h-12 w-12 text-white/80" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <Sparkles className="h-8 w-8 text-yellow-300/80" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <Flower className="h-10 w-10 text-pink-300/80" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
            ✨ Award-Winning Children's Author
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white drop-shadow-lg mb-2">Pouneh</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
              Wildflower
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Where wonder blooms and imagination takes flight through magical tales that transport children to enchanted worlds beyond their wildest dreams
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 magical-button" asChild>
              <a href="#books">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Books
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200 magical-button" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">📚 Magical Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Enchanted Tales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Step into magical worlds where anything is possible and every page holds a new adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Book 1 - The Positive Affirmations Alphabet Coloring Book */}
            <a href="https://amzn.to/48BCK4U" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100 magical-card hover:shadow-2xl transition-shadow">
                <div className="relative overflow-hidden h-80">
                  <img
                    src="/i-am-worthy.png"
                    alt="The Positive Affirmations Alphabet Coloring Book"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                    Inspire & Color Series
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-purple-800">The Positive Affirmations Alphabet Coloring Book</h3>
                  <p className="text-gray-600 mb-4">
                    Helping young hearts bloom with positivity, one affirmation, one coloring page, and one empowering word at a time!
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                      View on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Book 2 - Ocean Adventures */}
            <a href="https://amzn.to/48hk1Kr" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100 magical-card hover:shadow-2xl transition-shadow">
                <div className="relative overflow-hidden h-80">
                  <img
                    src="/ocean-adventures.png"
                    alt="Pouneh's Ocean Adventures"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 right-4 bg-cyan-400 text-white">
                    Adventure Series
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-purple-800">Pouneh's Ocean Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    Dive into a world of underwater wonders! Meet happy sea creatures, magical waves, and coral friends just waiting for you to bring them to life.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                      View on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Book 3 - Farm Adventures */}
            <a href="https://amzn.to/3M21bQa" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100 magical-card hover:shadow-2xl transition-shadow">
                <div className="relative overflow-hidden h-80">
                  <img
                    src="/farm-adventures.png"
                    alt="Pouneh's Farm Adventures"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 right-4 bg-green-400 text-white">
                    Adventure Series
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-purple-800">Pouneh's Farm Adventures</h3>
                  <p className="text-gray-600 mb-4">
                    A gentle journey through friendship, kindness, and color. Meet beautiful farm friends, loving caring for others, and discover the simple joy of slowing down.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                      View on Amazon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-purple-50/50 to-pink-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src="/pouneh-portrait.jpg"
                alt="Pouneh Wildflower"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                  <div>
                    <p className="font-bold text-lg">15+ Books</p>
                    <p className="text-sm text-gray-600">Published</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-800">🌸 About the Author</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pouneh Wildflower
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Pouneh Wildflower is a children's book creator, illustrator, and lover of all things magical and heart-warming. She creates cozy, uplifting coloring books that help little ones feel confident, creative, and deeply loved.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Her work blends simple, toddler-friendly art with gentle messages about self-worth, kindness, imagination, and joy. Every book she makes is created with the intention of bringing light into a child's day—one happy coloring moment at a time.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Pouneh is the creator of <em>The Positive Affirmation Alphabet Coloring Book</em>, <em>Pouneh's Ocean Adventures</em>, and <em>Pouneh's Farm Adventures</em>, with more titles blooming soon as part of her growing "Pouneh's Adventure Series." She hopes her books become quiet keepsakes in homes around the world—the kind little hands return to again and again.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Inspired by her own journey of self-love, spiritual growth, and motherhood, Pouneh believes that children deserve tools that help them feel seen, supported, and powerful. Her art and stories are designed to plant seeds of confidence that last a lifetime.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                When she's not drawing adorable animals or dreaming up new adventures, you can find her sipping tea, enjoying nature, or exploring the next chapter of her creative path—including future children's storybooks filled with warmth, whimsy, and heart.
              </p>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg mb-6">
                <p className="text-xl font-semibold text-purple-800 italic">
                  "You are loved. You are magical. And the world is brighter because you're in it."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-pink-50/50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-800">📧 Get in Touch</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Let's Create Magic Together
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're interested in school visits, book signings, or just want to share the wonder of reading, Pouneh would love to hear from you!
          </p>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Flower className="h-8 w-8" />
                <span className="font-bold text-xl">Pouneh Wildflower</span>
              </div>
              <p className="text-purple-200">
                Creating magical worlds for young readers, one story at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#books" className="hover:text-white transition-colors">Books</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Books</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">The Positive Affirmations Alphabet Coloring Book</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pouneh's Ocean Adventures</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pouneh's Farm Adventures</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
            <p>&copy; 2024 Pouneh Wildflower. All rights reserved. Made with 💜 and magic.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}