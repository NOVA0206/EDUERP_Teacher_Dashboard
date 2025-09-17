"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Calendar,
  QrCode,
  BookOpen,
  Bell,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react"
import Link from "next/link"

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  >
    <Icon className="w-8 h-8 text-primary/30" />
  </motion.div>
)

const ParticleEffect = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      size: Math.random() * 4 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [window.innerHeight + 50, -50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="pt-6">
        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="text-2xl font-bold text-primary">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  </motion.div>
)

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="group"
  >
    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleEffect />

      {/* Navigation */}
      <motion.nav
        className="relative z-50 px-6 py-4 bg-background/80 backdrop-blur-md border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EduERP</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Zap className="w-4 h-4 mr-1" />
                Next-Gen Education Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
                Transform Your
                <span className="text-primary"> Teaching Experience</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                Streamline attendance, manage classes, and engage students with our comprehensive Teacher Dashboard ERP
                system. Built for modern educators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 backdrop-blur-sm">
                <FloatingIcon icon={QrCode} className="top-4 right-4" delay={0} />
                <FloatingIcon icon={Users} className="top-20 left-4" delay={1} />
                <FloatingIcon icon={Calendar} className="bottom-20 right-8" delay={2} />
                <FloatingIcon icon={BookOpen} className="bottom-4 left-8" delay={3} />

                <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Today's Overview</h3>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Classes</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Attendance Rate</span>
                      <span className="font-semibold text-green-600">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Students Present</span>
                      <span className="font-semibold">247</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Trusted by Educators Worldwide</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of teachers who have transformed their classrooms
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Users} value="10K+" label="Active Teachers" delay={0} />
            <StatCard icon={GraduationCap} value="500K+" label="Students Managed" delay={0.1} />
            <StatCard icon={CheckCircle} value="99.9%" label="Uptime" delay={0.2} />
            <StatCard icon={Star} value="4.9/5" label="User Rating" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Teaching</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Everything you need to manage your classes efficiently and engage your students effectively
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={QrCode}
              title="Smart Attendance"
              description="Generate dynamic QR codes for instant attendance tracking. 10-second secure sessions with real-time validation and face recognition integration."
              delay={0}
            />
            <FeatureCard
              icon={Calendar}
              title="Class Scheduling"
              description="Effortlessly manage your timetable with drag-and-drop scheduling. Changes sync instantly with student mobile apps."
              delay={0.1}
            />
            <FeatureCard
              icon={BookOpen}
              title="Content Management"
              description="Upload syllabi, create course modules, and track student progress. Support for PDFs, documents, and multimedia content."
              delay={0.2}
            />
            <FeatureCard
              icon={Bell}
              title="Instant Announcements"
              description="Send targeted notifications to specific classes. Students receive push notifications on their mobile devices instantly."
              delay={0.3}
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Comprehensive insights into attendance patterns, student engagement, and class performance with exportable reports."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Reliable"
              description="Enterprise-grade security with encrypted data transmission, secure authentication, and 99.9% uptime guarantee."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Teaching?</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Join thousands of educators who have already revolutionized their classrooms with EduERP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Teacher Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">EduERP</span>
              </div>
              <p className="text-muted-foreground">
                Empowering educators with modern tools for effective teaching and student engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduERP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
