"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  QrCode,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Play,
  RotateCcw,
  Download,
  Wifi,
  Camera,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const LiveAttendanceSession = ({ classData, onComplete, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(10)
  const [sessionId] = useState(`SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [attendanceData, setAttendanceData] = useState({
    present: [],
    scanning: true,
    totalScanned: 0,
  })
  const [sessionActive, setSessionActive] = useState(false)

  const startSession = () => {
    setSessionActive(true)
    setTimeLeft(10)
    setAttendanceData({
      present: [],
      scanning: true,
      totalScanned: 0,
    })
  }

  useEffect(() => {
    if (!sessionActive || !attendanceData.scanning) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setAttendanceData((prev) => ({ ...prev, scanning: false }))
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate real-time attendance updates
    const attendanceTimer = setInterval(() => {
      if (timeLeft > 0) {
        const newStudent = {
          id: Date.now() + Math.random(),
          name: `Student ${Math.floor(Math.random() * 100)}`,
          scanTime: new Date().toLocaleTimeString(),
          verified: Math.random() > 0.1, // 90% success rate
        }

        setAttendanceData((prev) => ({
          ...prev,
          present: [...prev.present, newStudent],
          totalScanned: prev.totalScanned + 1,
        }))
      }
    }, 2000)

    return () => {
      clearInterval(timer)
      clearInterval(attendanceTimer)
    }
  }, [sessionActive, timeLeft, attendanceData.scanning])

  const handleComplete = () => {
    const result = {
      sessionId,
      classId: classData.id,
      present: attendanceData.present.filter((s) => s.verified),
      total: classData.students,
      timestamp: new Date().toISOString(),
    }
    onComplete(result)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Live Attendance Session</CardTitle>
              <CardDescription>
                {classData.subject} ({classData.code}) - Session ID: {sessionId.slice(-8)}
              </CardDescription>
            </div>
            <Badge variant={sessionActive ? "default" : "secondary"}>
              {sessionActive ? (attendanceData.scanning ? "Active" : "Completed") : "Ready"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!sessionActive ? (
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to Start Attendance</h3>
                <p className="text-muted-foreground mb-4">
                  Click the button below to generate a QR code for 10 seconds. Students will scan to mark their
                  attendance.
                </p>
              </div>
              <Button onClick={startSession} size="lg" className="w-full max-w-xs">
                <Play className="mr-2 h-4 w-4" />
                Start Attendance Session
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {attendanceData.scanning ? (
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-64 h-64 bg-white border-4 border-primary rounded-lg flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <QrCode className="w-32 h-32 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Scan to Attend</p>
                        <p className="text-xs text-muted-foreground">Session: {sessionId.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shadow-lg animate-pulse-glow">
                      {timeLeft}
                    </div>
                  </div>
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Students Scanned</span>
                      <span className="font-bold text-lg">{attendanceData.totalScanned}</span>
                    </div>
                    <Progress value={(attendanceData.totalScanned / classData.students) * 100} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                      QR expires in {timeLeft} seconds • {classData.students - attendanceData.totalScanned} remaining
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Session Completed</h3>
                    <p className="text-muted-foreground">
                      {attendanceData.present.filter((s) => s.verified).length} students marked present
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <Button onClick={handleComplete}>Save Attendance</Button>
                    <Button onClick={startSession} variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Restart Session
                    </Button>
                  </div>
                </div>
              )}

              {/* Live Feed */}
              {attendanceData.present.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Attendance Feed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {attendanceData.present
                        .slice()
                        .reverse()
                        .map((student) => (
                          <motion.div
                            key={student.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-2 bg-muted/50 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              {student.verified ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              <span className="text-sm font-medium">{student.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{student.scanTime}</span>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* System Status */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Wifi className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-green-600 font-medium">Network OK</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Camera className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-blue-600 font-medium">Face Recognition</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-purple-600 font-medium">Real-time Sync</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function ClassAttendancePage() {
  const params = useParams()
  const [classData, setClassData] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [attendanceResult, setAttendanceResult] = useState(null)

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockClass = {
      id: params.classId,
      subject: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      room: "Room A-204",
      schedule: "Mon, Wed, Fri - 10:00 AM",
    }
    setClassData(mockClass)
  }, [params.classId])

  const handleAttendanceComplete = (result) => {
    setAttendanceResult(result)
    setShowSuccess(true)
    // In real app, save to database
    console.log("Attendance saved:", result)
  }

  const handleCancel = () => {
    // Handle cancellation
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (showSuccess && attendanceResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/classes/${classData.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Class
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Attendance Recorded Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                {attendanceResult.present.length} out of {attendanceResult.total} students marked present
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{attendanceResult.present.length}</p>
                  <p className="text-sm text-green-600">Present</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {attendanceResult.total - attendanceResult.present.length}
                  </p>
                  <p className="text-sm text-red-600">Absent</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((attendanceResult.present.length / attendanceResult.total) * 100)}%
                  </p>
                  <p className="text-sm text-blue-600">Rate</p>
                </div>
              </div>

              <div className="flex space-x-2 justify-center">
                <Link href={`/dashboard/classes/${classData.id}`}>
                  <Button>View Class Details</Button>
                </Link>
                <Button variant="outline" onClick={() => setShowSuccess(false)}>
                  Take Another Session
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-4 mb-6">
          <Link href={`/dashboard/classes/${classData.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Class
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Take Attendance</h1>
          <p className="text-muted-foreground">
            {classData.subject} ({classData.code}) • {classData.room}
          </p>
        </div>
      </motion.div>

      {/* Instructions */}
      <Alert>
        <QrCode className="h-4 w-4" />
        <AlertDescription>
          <strong>How it works:</strong> Click "Start Attendance Session" to generate a QR code that will be active for
          exactly 10 seconds. Students must scan the QR code with their mobile app during this time window. The system
          includes face recognition and location verification for security.
        </AlertDescription>
      </Alert>

      {/* Live Session */}
      <LiveAttendanceSession classData={classData} onComplete={handleAttendanceComplete} onCancel={handleCancel} />

      {/* Class Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{classData.students}</p>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-lg font-bold">10 sec</p>
                <p className="text-sm text-muted-foreground">QR Active Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-lg font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
