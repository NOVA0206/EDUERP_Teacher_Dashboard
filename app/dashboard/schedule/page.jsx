"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [schedule, setSchedule] = useState({})
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [viewMode, setViewMode] = useState("week") // week, day, month
  const [newEvent, setNewEvent] = useState({
    title: "",
    class: "",
    room: "",
    day: "",
    startTime: "",
    endTime: "",
    type: "lecture",
  })

  useEffect(() => {
    // Load schedule from localStorage or set default
    const savedSchedule = localStorage.getItem("teacherSchedule")
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule))
    } else {
      const defaultSchedule = {
        Monday: [
          {
            id: 1,
            title: "Computer Science 101",
            class: "CS101",
            room: "Room A-204",
            startTime: "09:00",
            endTime: "10:30",
            type: "lecture",
            students: 45,
            color: "bg-blue-500",
          },
          {
            id: 2,
            title: "Data Structures Lab",
            class: "DS201",
            room: "Lab B-105",
            startTime: "14:00",
            endTime: "16:00",
            type: "lab",
            students: 30,
            color: "bg-green-500",
          },
        ],
        Tuesday: [
          {
            id: 3,
            title: "Algorithms",
            class: "ALG301",
            room: "Room C-301",
            startTime: "10:00",
            endTime: "11:30",
            type: "lecture",
            students: 52,
            color: "bg-purple-500",
          },
        ],
        Wednesday: [
          {
            id: 4,
            title: "Computer Science 101",
            class: "CS101",
            room: "Room A-204",
            startTime: "09:00",
            endTime: "10:30",
            type: "lecture",
            students: 45,
            color: "bg-blue-500",
          },
          {
            id: 5,
            title: "Office Hours",
            class: "ALL",
            room: "Office 205",
            startTime: "15:00",
            endTime: "17:00",
            type: "office",
            students: 0,
            color: "bg-gray-500",
          },
        ],
        Thursday: [
          {
            id: 6,
            title: "Data Structures",
            class: "DS201",
            room: "Room B-203",
            startTime: "11:00",
            endTime: "12:30",
            type: "lecture",
            students: 38,
            color: "bg-green-500",
          },
        ],
        Friday: [
          {
            id: 7,
            title: "Algorithms",
            class: "ALG301",
            room: "Room C-301",
            startTime: "10:00",
            endTime: "11:30",
            type: "lecture",
            students: 52,
            color: "bg-purple-500",
          },
          {
            id: 8,
            title: "Data Structures Lab",
            class: "DS201",
            room: "Lab B-105",
            startTime: "14:00",
            endTime: "16:00",
            type: "lab",
            students: 30,
            color: "bg-green-500",
          },
        ],
      }
      setSchedule(defaultSchedule)
      localStorage.setItem("teacherSchedule", JSON.stringify(defaultSchedule))
    }
  }, [])

  const getWeekDates = (date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDates = getWeekDates(currentWeek)

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + direction * 7)
    setCurrentWeek(newDate)
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.day || !newEvent.startTime || !newEvent.endTime) return

    const event = {
      id: Date.now(),
      ...newEvent,
      students: Math.floor(Math.random() * 50) + 20,
      color: `bg-${["blue", "green", "purple", "orange", "red"][Math.floor(Math.random() * 5)]}-500`,
    }

    const updatedSchedule = {
      ...schedule,
      [newEvent.day]: [...(schedule[newEvent.day] || []), event],
    }

    setSchedule(updatedSchedule)
    localStorage.setItem("teacherSchedule", JSON.stringify(updatedSchedule))

    setNewEvent({
      title: "",
      class: "",
      room: "",
      day: "",
      startTime: "",
      endTime: "",
      type: "lecture",
    })
    setIsAddEventOpen(false)
  }

  const getEventPosition = (startTime, endTime) => {
    const startHour = Number.parseInt(startTime.split(":")[0])
    const startMinute = Number.parseInt(startTime.split(":")[1])
    const endHour = Number.parseInt(endTime.split(":")[0])
    const endMinute = Number.parseInt(endTime.split(":")[1])

    const startPosition = (((startHour - 8) * 60 + startMinute) / 60) * 4 // 4rem per hour
    const duration = (((endHour - startHour) * 60 + (endMinute - startMinute)) / 60) * 4

    return { top: `${startPosition}rem`, height: `${duration}rem` }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "lecture":
        return "📚"
      case "lab":
        return "🔬"
      case "office":
        return "🏢"
      case "exam":
        return "📝"
      default:
        return "📅"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Schedule</h1>
            <p className="text-muted-foreground">Manage your teaching schedule and class timings</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Schedule a new class, meeting, or event</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="e.g., Computer Science 101"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Class Code</Label>
                      <Input
                        value={newEvent.class}
                        onChange={(e) => setNewEvent({ ...newEvent, class: e.target.value })}
                        placeholder="e.g., CS101"
                      />
                    </div>
                    <div>
                      <Label>Room</Label>
                      <Input
                        value={newEvent.room}
                        onChange={(e) => setNewEvent({ ...newEvent, room: e.target.value })}
                        placeholder="e.g., Room A-204"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Day</Label>
                      <Select value={newEvent.day} onValueChange={(value) => setNewEvent({ ...newEvent, day: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {weekDays.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Select
                        value={newEvent.startTime}
                        onValueChange={(value) => setNewEvent({ ...newEvent, startTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Select
                        value={newEvent.endTime}
                        onValueChange={(value) => setNewEvent({ ...newEvent, endTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="office">Office Hours</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent}>Add Event</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>

      {/* Week Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Week
            </Button>
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                {weekDates[0].toLocaleDateString("en-US", { month: "long", day: "numeric" })} -{" "}
                {weekDates[6].toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigateWeek(1)}>
              Next Week
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-muted/50">
              <span className="text-sm font-medium">Time</span>
            </div>
            {weekDays.map((day, index) => (
              <div key={day} className="p-4 border-r bg-muted/50 text-center">
                <div className="font-medium">{day}</div>
                <div className="text-sm text-muted-foreground">
                  {weekDates[index]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-8 relative">
            {/* Time slots */}
            <div className="border-r">
              {timeSlots.map((time) => (
                <div key={time} className="h-16 p-2 border-b text-sm text-muted-foreground">
                  {time}
                </div>
              ))}
            </div>

            {/* Schedule columns */}
            {weekDays.map((day) => (
              <div key={day} className="border-r relative">
                {timeSlots.map((time) => (
                  <div key={time} className="h-16 border-b"></div>
                ))}

                {/* Events */}
                {schedule[day]?.map((event) => {
                  const position = getEventPosition(event.startTime, event.endTime)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute left-1 right-1 ${event.color} text-white rounded-lg p-2 text-xs shadow-lg cursor-pointer hover:shadow-xl transition-all`}
                      style={position}
                    >
                      <div className="font-medium truncate">
                        {getTypeIcon(event.type)} {event.title}
                      </div>
                      <div className="opacity-90 truncate">{event.room}</div>
                      <div className="opacity-75">
                        {event.startTime} - {event.endTime}
                      </div>
                      {event.students > 0 && (
                        <div className="flex items-center mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{event.students}</span>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Quick overview of today's classes and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {schedule[weekDays[new Date().getDay() - 1]]?.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${event.color}`} />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {event.startTime} - {event.endTime}
                  </p>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              </div>
            )) || <p className="text-muted-foreground text-center py-4">No classes scheduled for today</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
