"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Save, Trash2, Bell, Shield, BookOpen, QrCode } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function ClassSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const [classData, setClassData] = useState(null)
  const [settings, setSettings] = useState({
    general: {
      className: "",
      description: "",
      room: "",
      capacity: "",
      semester: "",
      credits: "",
    },
    attendance: {
      qrCodeDuration: 10,
      autoMarkAbsent: true,
      allowLateEntry: false,
      requireFaceRecognition: false,
      attendanceThreshold: 75,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      attendanceAlerts: true,
      assignmentReminders: true,
      classUpdates: true,
    },
    privacy: {
      allowStudentViewGrades: true,
      allowStudentViewAttendance: true,
      publicClassInfo: false,
      allowGuestAccess: false,
    },
  })

  useEffect(() => {
    // Load class data
    const classes = JSON.parse(localStorage.getItem("classes") || "[]")
    const currentClass = classes.find((c) => c.id === Number.parseInt(params.classId))

    if (currentClass) {
      setClassData(currentClass)
      setSettings((prev) => ({
        ...prev,
        general: {
          className: currentClass.name || "",
          description: currentClass.description || "",
          room: currentClass.room || "",
          capacity: currentClass.capacity || "",
          semester: currentClass.semester || "",
          credits: currentClass.credits || "",
        },
      }))
    }
  }, [params.classId])

  const handleSaveSettings = () => {
    // Save settings to localStorage
    const savedSettings = JSON.parse(localStorage.getItem("classSettings") || "{}")
    savedSettings[params.classId] = settings
    localStorage.setItem("classSettings", JSON.stringify(savedSettings))

    // Update class data if general settings changed
    if (classData) {
      const classes = JSON.parse(localStorage.getItem("classes") || "[]")
      const updatedClasses = classes.map((c) =>
        c.id === Number.parseInt(params.classId) ? { ...c, ...settings.general, name: settings.general.className } : c,
      )
      localStorage.setItem("classes", JSON.stringify(updatedClasses))
    }

    // Show success message (you could add a toast here)
    alert("Settings saved successfully!")
  }

  const handleDeleteClass = () => {
    const classes = JSON.parse(localStorage.getItem("classes") || "[]")
    const updatedClasses = classes.filter((c) => c.id !== Number.parseInt(params.classId))
    localStorage.setItem("classes", JSON.stringify(updatedClasses))

    // Remove class settings
    const savedSettings = JSON.parse(localStorage.getItem("classSettings") || "{}")
    delete savedSettings[params.classId]
    localStorage.setItem("classSettings", JSON.stringify(savedSettings))

    router.push("/dashboard/classes")
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Class Settings</h1>
            <p className="text-muted-foreground">Configure settings for {classData.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleSaveSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Class
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the class and all associated data
                    including attendance records and content.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteClass}>Delete Class</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription>Basic information and configuration for your class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    value={settings.general.className}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, className: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    value={settings.general.room}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, room: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={settings.general.description}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, description: e.target.value },
                    }))
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={settings.general.capacity}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, capacity: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={settings.general.semester}
                    onValueChange={(value) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, semester: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall2024">Fall 2024</SelectItem>
                      <SelectItem value="spring2025">Spring 2025</SelectItem>
                      <SelectItem value="summer2025">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={settings.general.credits}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        general: { ...prev.general, credits: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Attendance Settings
              </CardTitle>
              <CardDescription>Configure how attendance is tracked for this class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="qrDuration">QR Code Duration (seconds)</Label>
                  <Input
                    id="qrDuration"
                    type="number"
                    value={settings.attendance.qrCodeDuration}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        attendance: { ...prev.attendance, qrCodeDuration: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="threshold">Attendance Threshold (%)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={settings.attendance.attendanceThreshold}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        attendance: { ...prev.attendance, attendanceThreshold: Number.parseInt(e.target.value) },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-mark Absent</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically mark students as absent if they don't scan QR code
                    </p>
                  </div>
                  <Switch
                    checked={settings.attendance.autoMarkAbsent}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        attendance: { ...prev.attendance, autoMarkAbsent: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Late Entry</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow students to mark attendance after class starts
                    </p>
                  </div>
                  <Switch
                    checked={settings.attendance.allowLateEntry}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        attendance: { ...prev.attendance, allowLateEntry: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Face Recognition</Label>
                    <p className="text-sm text-muted-foreground">
                      Require face verification along with QR code scanning
                    </p>
                  </div>
                  <Switch
                    checked={settings.attendance.requireFaceRecognition}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        attendance: { ...prev.attendance, requireFaceRecognition: checked },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications for this class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about class activities</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text message alerts for urgent updates</p>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsNotifications: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Attendance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when students have low attendance</p>
                </div>
                <Switch
                  checked={settings.notifications.attendanceAlerts}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, attendanceAlerts: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Assignment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders about upcoming assignment deadlines</p>
                </div>
                <Switch
                  checked={settings.notifications.assignmentReminders}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, assignmentReminders: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Class Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications about schedule changes and announcements
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.classUpdates}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, classUpdates: checked },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control what information students can access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Students to View Grades</Label>
                  <p className="text-sm text-muted-foreground">Students can see their individual grades and scores</p>
                </div>
                <Switch
                  checked={settings.privacy.allowStudentViewGrades}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, allowStudentViewGrades: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Students to View Attendance</Label>
                  <p className="text-sm text-muted-foreground">
                    Students can see their attendance records and statistics
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowStudentViewAttendance}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, allowStudentViewAttendance: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Class Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Make basic class information visible to non-enrolled users
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.publicClassInfo}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, publicClassInfo: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Guest Access</Label>
                  <p className="text-sm text-muted-foreground">Allow temporary access for visitors or auditors</p>
                </div>
                <Switch
                  checked={settings.privacy.allowGuestAccess}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      privacy: { ...prev.privacy, allowGuestAccess: checked },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
