"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddClassPage() {
  const [formData, setFormData] = useState({
    subject: "",
    code: "",
    description: "",
    semester: "",
    credits: "",
    maxStudents: "",
    room: "",
    schedule: {
      monday: { enabled: false, startTime: "", endTime: "" },
      tuesday: { enabled: false, startTime: "", endTime: "" },
      wednesday: { enabled: false, startTime: "", endTime: "" },
      thursday: { enabled: false, startTime: "", endTime: "" },
      friday: { enabled: false, startTime: "", endTime: "" },
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const semesters = ["Fall 2024", "Spring 2025", "Summer 2025", "Fall 2025"]
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  const dayLabels = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.subject || !formData.code || !formData.semester) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Check if at least one day is scheduled
    const hasSchedule = Object.values(formData.schedule).some((day) => day.enabled)
    if (!hasSchedule) {
      setError("Please schedule at least one class session")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful creation
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard/classes")
      }, 2000)
    } catch (err) {
      setError("Failed to create class. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSemesterChange = (value) => {
    setFormData({
      ...formData,
      semester: value,
    })
  }

  const handleScheduleChange = (day, field, value) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: {
          ...formData.schedule[day],
          [field]: value,
        },
      },
    })
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Class Created Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                Your new class has been added to your schedule. Students can now enroll and you can start managing
                attendance.
              </p>
              <Link href="/dashboard/classes">
                <Button>View All Classes</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
        <div>
          <h1 className="text-3xl font-bold">Add New Class</h1>
          <p className="text-muted-foreground">Create a new class and set up the schedule</p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details for your class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Name *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="e.g., Introduction to Computer Science"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Course Code *</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g., CS101"
                  value={formData.code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description of the course content and objectives"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select onValueChange={handleSemesterChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  placeholder="3"
                  value={formData.credits}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  placeholder="50"
                  value={formData.maxStudents}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room/Location</Label>
              <Input
                id="room"
                name="room"
                placeholder="e.g., Room A-204, Lab B-105"
                value={formData.room}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Class Schedule</CardTitle>
            <CardDescription>Set up when your class meets during the week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={day}
                    checked={formData.schedule[day].enabled}
                    onChange={(e) => handleScheduleChange(day, "enabled", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor={day} className="w-20">
                    {dayLabels[day]}
                  </Label>
                </div>
                {formData.schedule[day].enabled && (
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      type="time"
                      value={formData.schedule[day].startTime}
                      onChange={(e) => handleScheduleChange(day, "startTime", e.target.value)}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={formData.schedule[day].endTime}
                      onChange={(e) => handleScheduleChange(day, "endTime", e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/classes">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Class..." : "Create Class"}
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
