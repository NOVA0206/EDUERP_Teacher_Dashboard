"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear session storage
    localStorage.removeItem("teacherSession")

    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Logged Out Successfully</h2>
            <p className="text-muted-foreground mb-6">
              You have been safely logged out of your EduERP account. Thank you for using our platform!
            </p>
            <div className="space-y-3">
              <Link href="/auth/login">
                <Button className="w-full">Sign In Again</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Redirecting to home page in 3 seconds...</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
