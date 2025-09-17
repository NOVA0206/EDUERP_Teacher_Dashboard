"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  QrCode,
  Users,
  Calendar,
  TrendingUp,
  Download,
  CheckCircle,
  BarChart3,
  Monitor,
  Wifi,
  X,
  Maximize2,
} from "lucide-react"

const generateQRCodeSVG = (text, size = 200) => {
  // Simple QR code pattern generator for demo purposes
  const modules = 25 // QR code grid size
  const moduleSize = size / modules
  const pattern = []

  // Generate a pseudo-random pattern based on the text
  const seed = text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  let random = seed

  for (let i = 0; i < modules * modules; i++) {
    random = (random * 1103515245 + 12345) & 0x7fffffff
    pattern.push(random % 2 === 0)
  }

  const squares = pattern
    .map((filled, index) => {
      if (!filled) return null
      const row = Math.floor(index / modules)
      const col = index % modules
      return (
        <rect
          key={index}
          x={col * moduleSize}
          y={row * moduleSize}
          width={moduleSize}
          height={moduleSize}
          fill="#000"
        />
      )
    })
    .filter(Boolean)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="border-2 border-gray-300 rounded">
      <rect width={size} height={size} fill="#fff" />
      {squares}
      {/* Corner markers */}
      <rect x="0" y="0" width={moduleSize * 7} height={moduleSize * 7} fill="#000" />
      <rect x={moduleSize} y={moduleSize} width={moduleSize * 5} height={moduleSize * 5} fill="#fff" />
      <rect x={moduleSize * 2} y={moduleSize * 2} width={moduleSize * 3} height={moduleSize * 3} fill="#000" />

      <rect x={size - moduleSize * 7} y="0" width={moduleSize * 7} height={moduleSize * 7} fill="#000" />
      <rect x={size - moduleSize * 6} y={moduleSize} width={moduleSize * 5} height={moduleSize * 5} fill="#fff" />
      <rect x={size - moduleSize * 5} y={moduleSize * 2} width={moduleSize * 3} height={moduleSize * 3} fill="#000" />

      <rect x="0" y={size - moduleSize * 7} width={moduleSize * 7} height={moduleSize * 7} fill="#000" />
      <rect x={moduleSize} y={size - moduleSize * 6} width={moduleSize * 5} height={moduleSize * 5} fill="#fff" />
      <rect x={moduleSize * 2} y={size - moduleSize * 5} width={moduleSize * 3} height={moduleSize * 3} fill="#000" />
    </svg>
  )
}

const AttendanceCard = ({ classData, onStartAttendance }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{classData.subject}</CardTitle>
            <CardDescription>{classData.code}</CardDescription>
          </div>
          <Badge variant={classData.status === "active" ? "default" : "secondary"}>{classData.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Students Enrolled</span>
            <span className="font-medium">{classData.students}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Attendance Rate</span>
            <span className="font-medium text-green-600">{classData.attendanceRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Session</span>
            <span className="font-medium">{classData.lastSession}</span>
          </div>
          <div className="pt-2 border-t">
            <Button
              onClick={() => onStartAttendance(classData)}
              className="w-full"
              disabled={classData.status !== "active"}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Start Attendance
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const QRModeSelectionModal = ({ isOpen, onClose, onModeSelect, classData }) => {
  const [selectedMode, setSelectedMode] = useState("projector")

  const handleContinue = () => {
    onModeSelect(selectedMode)
    onClose()
  }

  if (!isOpen || !classData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose QR Distribution Mode</DialogTitle>
          <DialogDescription>
            Select how you want to share the QR code with students in {classData.subject}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <RadioGroup value={selectedMode} onValueChange={setSelectedMode}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="projector" id="projector" />
                <Label htmlFor="projector" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Monitor className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Projector Display</p>
                      <p className="text-sm text-muted-foreground">
                        Show QR code on projector/screen for students to scan
                      </p>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="broadcast" id="broadcast" />
                <Label htmlFor="broadcast" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Backend Broadcast</p>
                      <p className="text-sm text-muted-foreground">
                        Send QR to students' devices via college WiFi network
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProjectorQRDisplay = ({ isOpen, onClose, classData, sessionId, qrData, timeLeft }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="text-center text-white space-y-8">
        <div>
          <h1 className="text-6xl font-bold mb-4">Scan QR Code</h1>
          <p className="text-2xl text-gray-300">{classData.subject} - Attendance</p>
        </div>

        <div className="relative">
          <div className="w-96 h-96 mx-auto bg-white rounded-2xl flex items-center justify-center p-8">
            {generateQRCodeSVG(qrData, 320)}
          </div>
          <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-2xl animate-pulse">
            {timeLeft}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xl">Session ID: {sessionId.slice(-8)}</p>
          <p className="text-lg text-gray-300">QR code expires in {timeLeft} seconds</p>
          <div className="text-green-400 text-lg animate-pulse">🔴 LIVE - Students can scan now</div>
        </div>
      </div>
    </div>
  )
}

const QRAttendanceModal = ({ isOpen, onClose, classData, onComplete, mode = "projector" }) => {
  const [timeLeft, setTimeLeft] = useState(10)
  const [sessionId] = useState(`SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    scanning: true,
    connectedStudents: 0,
    broadcastStatus: "connecting",
  })
  const [qrData, setQrData] = useState("")
  const [showProjector, setShowProjector] = useState(false)

  React.useEffect(() => {
    if (!isOpen || !classData) return

    const qrCodeData = JSON.stringify({
      sessionId,
      classId: classData.id,
      className: classData.subject,
      timestamp: Date.now(),
      expiresAt: Date.now() + 10000,
      mode: mode,
    })
    setQrData(qrCodeData)

    if (mode === "broadcast") {
      setAttendanceData((prev) => ({ ...prev, broadcastStatus: "connecting" }))

      setTimeout(() => {
        setAttendanceData((prev) => ({
          ...prev,
          broadcastStatus: "connected",
          connectedStudents: Math.floor(classData.students * 0.8),
        }))
      }, 2000)

      setTimeout(() => {
        setAttendanceData((prev) => ({ ...prev, broadcastStatus: "broadcasting" }))
      }, 3000)
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setAttendanceData((prev) => ({ ...prev, scanning: false }))
          setTimeout(() => {
            onComplete({
              sessionId,
              present: Math.floor(Math.random() * 10) + 35,
              absent: classData.students - (Math.floor(Math.random() * 10) + 35),
              mode: mode,
            })
          }, 2000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const attendanceTimer = setInterval(() => {
      if (timeLeft > 0) {
        setAttendanceData((prev) => ({
          ...prev,
          present: prev.present + Math.floor(Math.random() * 3),
        }))
      }
    }, 1500)

    return () => {
      clearInterval(timer)
      clearInterval(attendanceTimer)
    }
  }, [isOpen, classData, mode])

  if (!isOpen || !classData) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-background rounded-lg p-6 max-w-md w-full"
        >
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {mode === "projector" ? "Projector" : "Broadcast"} Attendance Session
              </h3>
              <p className="text-muted-foreground">
                {classData.subject} ({classData.code})
              </p>
            </div>

            {attendanceData.scanning ? (
              <>
                {mode === "projector" ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center p-4">
                        <div className="relative">
                          {generateQRCodeSVG(qrData, 180)}
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                            {timeLeft}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Session ID: {sessionId.slice(-8)}</p>
                    </div>

                    <Button onClick={() => setShowProjector(true)} variant="outline" className="w-full">
                      <Maximize2 className="mr-2 h-4 w-4" />
                      Show on Projector
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Wifi className="w-8 h-8 text-green-600" />
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium">
                        {attendanceData.broadcastStatus === "connecting" && "Connecting to college WiFi..."}
                        {attendanceData.broadcastStatus === "connected" && "Connected! Detecting student devices..."}
                        {attendanceData.broadcastStatus === "broadcasting" && "Broadcasting QR to student devices"}
                      </p>

                      {attendanceData.broadcastStatus === "connected" && (
                        <p className="text-sm text-muted-foreground">
                          Found {attendanceData.connectedStudents} students on network
                        </p>
                      )}

                      {attendanceData.broadcastStatus === "broadcasting" && (
                        <div className="text-xs text-green-600 animate-pulse">
                          📱 QR sent to {attendanceData.connectedStudents} student devices
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Students Scanned</span>
                    <span className="font-bold text-lg">{attendanceData.present}</span>
                  </div>
                  <Progress value={(attendanceData.present / classData.students) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">Session expires in {timeLeft} seconds</p>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Session Completed</h4>
                  <p className="text-muted-foreground">Processing attendance data...</p>
                </div>
              </div>
            )}

            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              {attendanceData.scanning ? "Cancel Session" : "Close"}
            </Button>
          </div>
        </motion.div>
      </div>

      <ProjectorQRDisplay
        isOpen={showProjector}
        onClose={() => setShowProjector(false)}
        classData={classData}
        sessionId={sessionId}
        qrData={qrData}
        timeLeft={timeLeft}
      />
    </>
  )
}

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [showModeModal, setShowModeModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [currentClass, setCurrentClass] = useState(null)
  const [attendanceMode, setAttendanceMode] = useState("projector")

  const classes = [
    {
      id: "cs101",
      subject: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      status: "active",
      attendanceRate: 92,
      lastSession: "2 hours ago",
    },
    {
      id: "ds201",
      subject: "Data Structures and Algorithms",
      code: "DS201",
      students: 38,
      status: "active",
      attendanceRate: 88,
      lastSession: "Yesterday",
    },
    {
      id: "alg301",
      subject: "Advanced Algorithms",
      code: "ALG301",
      students: 25,
      status: "active",
      attendanceRate: 96,
      lastSession: "3 days ago",
    },
  ]

  const recentSessions = [
    {
      id: 1,
      class: "CS101",
      date: "2024-01-24",
      time: "10:00 AM",
      present: 42,
      absent: 3,
      rate: 93,
      status: "completed",
    },
    {
      id: 2,
      class: "DS201",
      date: "2024-01-23",
      time: "2:00 PM",
      present: 35,
      absent: 3,
      rate: 92,
      status: "completed",
    },
    {
      id: 3,
      class: "ALG301",
      date: "2024-01-22",
      time: "4:00 PM",
      present: 24,
      absent: 1,
      rate: 96,
      status: "completed",
    },
  ]

  const handleStartAttendance = (classData) => {
    setCurrentClass(classData)
    setShowModeModal(true)
  }

  const handleModeSelect = (mode) => {
    setAttendanceMode(mode)
    setShowQRModal(true)
  }

  const handleAttendanceComplete = (result) => {
    console.log("Attendance completed:", result)
    setShowQRModal(false)
    setShowModeModal(false)
    setCurrentClass(null)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground">Track and manage student attendance with QR codes</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(classes.reduce((sum, c) => sum + c.attendanceRate, 0) / classes.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{recentSessions.length}</p>
                <p className="text-sm text-muted-foreground">Sessions Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">+5%</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quick-start" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-start" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Start Attendance Session</CardTitle>
              <CardDescription>
                Select a class to generate a QR code for attendance. The QR code will be active for 10 seconds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classData) => (
                  <AttendanceCard key={classData.id} classData={classData} onStartAttendance={handleStartAttendance} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Sessions</CardTitle>
                  <CardDescription>View and manage attendance records</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="semester">This Semester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {session.class} - {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">{session.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">{session.present}</p>
                        <p className="text-xs text-muted-foreground">Present</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-red-600">{session.absent}</p>
                        <p className="text-xs text-muted-foreground">Absent</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{session.rate}%</p>
                        <p className="text-xs text-muted-foreground">Rate</p>
                      </div>
                      <Badge variant={session.status === "completed" ? "default" : "secondary"}>{session.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Weekly attendance rates by class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {classes.map((cls) => (
                  <div key={cls.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{cls.code}</span>
                      <span>{cls.attendanceRate}%</span>
                    </div>
                    <Progress value={cls.attendanceRate} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
                <CardDescription>Performance metrics for this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">15</p>
                    <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">92%</p>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">8.5s</p>
                    <p className="text-sm text-muted-foreground">Avg Scan Time</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">98%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <QRModeSelectionModal
        isOpen={showModeModal}
        onClose={() => setShowModeModal(false)}
        onModeSelect={handleModeSelect}
        classData={currentClass}
      />

      <QRAttendanceModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        classData={currentClass}
        onComplete={handleAttendanceComplete}
        mode={attendanceMode}
      />
    </div>
  )
}
