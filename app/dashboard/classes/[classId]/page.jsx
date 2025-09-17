"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Clock, MapPin, BookOpen, QrCode, Bell, Settings, ArrowLeft, UserCheck } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ClassDetailsPage() {
  const params = useParams()
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    // Mock data - in real app, fetch from API using params.classId
    const mockClass = {
      id: params.classId,
      subject: "Introduction to Computer Science",
      code: "CS101",
      description:
        "This course introduces students to the fundamental concepts of computer science, including programming basics, data structures, and problem-solving techniques.",
      students: 45,
      enrolled: 45,
      maxStudents: 50,
      status: "active",
      schedule: "Mon, Wed, Fri - 10:00 AM - 11:30 AM",
      room: "Room A-204",
      semester: "Fall 2024",
      credits: 3,
      attendanceRate: 92,
      teacher: "Dr. Sarah Johnson",
      department: "Computer Science",
    }
    setClassData(mockClass)
  }, [params.classId])

  const attendanceData = [
    { date: "2024-01-15", present: 42, absent: 3, rate: 93 },
    { date: "2024-01-17", present: 41, absent: 4, rate: 91 },
    { date: "2024-01-19", present: 44, absent: 1, rate: 98 },
    { date: "2024-01-22", present: 40, absent: 5, rate: 89 },
    { date: "2024-01-24", present: 43, absent: 2, rate: 96 },
  ]

  const recentStudents = [
    { id: 1, name: "Alice Johnson", email: "alice@university.edu", attendance: 95, status: "excellent" },
    { id: 2, name: "Bob Smith", email: "bob@university.edu", attendance: 88, status: "good" },
    { id: 3, name: "Carol Davis", email: "carol@university.edu", attendance: 76, status: "needs-attention" },
    { id: 4, name: "David Wilson", email: "david@university.edu", attendance: 92, status: "good" },
    { id: 5, name: "Eva Brown", email: "eva@university.edu", attendance: 85, status: "good" },
  ]

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard/classes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{classData.subject}</h1>
            <p className="text-muted-foreground">
              {classData.code} • {classData.semester}
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href={`/dashboard/classes/${classData.id}/attendance`}>
              <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Take Attendance
              </Button>
            </Link>
            <Link href={`/dashboard/classes/${classData.id}/settings`}>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {classData.enrolled}/{classData.maxStudents}
                </p>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{classData.attendanceRate}%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{classData.credits}</p>
                <p className="text-sm text-muted-foreground">Credit Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Weeks Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground">{classData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Room</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{classData.room}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Schedule</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{classData.schedule}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge variant={classData.status === "active" ? "default" : "secondary"}>{classData.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance Trend</CardTitle>
                <CardDescription>Last 5 class sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceData.map((session, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <span>{session.rate}%</span>
                      </div>
                      <Progress value={session.rate} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{session.present} present</span>
                        <span>{session.absent} absent</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>Manage your class roster and student information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.attendance}%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                      <Badge
                        variant={
                          student.status === "excellent"
                            ? "default"
                            : student.status === "good"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Overall Attendance Rate</span>
                    <span className="font-bold">{classData.attendanceRate}%</span>
                  </div>
                  <Progress value={classData.attendanceRate} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">42</p>
                    <p className="text-sm text-muted-foreground">Avg Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-sm text-muted-foreground">Avg Absent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/dashboard/classes/${classData.id}/attendance`}>
                  <Button className="w-full justify-start">
                    <QrCode className="mr-2 h-4 w-4" />
                    Start Attendance Session
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <UserCheck className="mr-2 h-4 w-4" />
                  View Attendance Records
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="mr-2 h-4 w-4" />
                  Send Attendance Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Current schedule for {classData.semester}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Monday</h4>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                    <p className="text-sm text-muted-foreground">{classData.room}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Wednesday</h4>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                    <p className="text-sm text-muted-foreground">{classData.room}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Friday</h4>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                    <p className="text-sm text-muted-foreground">{classData.room}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Modify Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ children, ...props }) {
  return (
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      {...props}
    >
      {children}
    </label>
  )
}
