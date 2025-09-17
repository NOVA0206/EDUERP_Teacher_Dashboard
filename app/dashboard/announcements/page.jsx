"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Bell, Plus, Send, Users, Calendar, Search, Filter, MoreVertical } from "lucide-react"

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "general",
    targetClass: "all",
    priority: "normal",
  })

  useEffect(() => {
    // Load announcements from localStorage or set default ones
    const savedAnnouncements = localStorage.getItem("announcements")
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements))
    } else {
      const defaultAnnouncements = [
        {
          id: 1,
          title: "Assignment Due Reminder",
          message:
            "Don't forget that your Data Structures assignment is due tomorrow at 11:59 PM. Please submit through the course portal.",
          type: "assignment",
          targetClass: "CS101",
          priority: "high",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: "sent",
          recipients: 45,
        },
        {
          id: 2,
          title: "Class Rescheduled",
          message:
            "Tomorrow's Data Structures class has been moved to Friday 2:00 PM in Room B-105. Please update your schedules accordingly.",
          type: "schedule",
          targetClass: "DS201",
          priority: "normal",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: "sent",
          recipients: 38,
        },
        {
          id: 3,
          title: "New Study Materials Available",
          message:
            "I've uploaded the Chapter 5 notes and practice problems to the course content section. These will help you prepare for next week's quiz.",
          type: "material",
          targetClass: "ALG301",
          priority: "normal",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: "sent",
          recipients: 52,
        },
      ]
      setAnnouncements(defaultAnnouncements)
      localStorage.setItem("announcements", JSON.stringify(defaultAnnouncements))
    }
  }, [])

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message) return

    const announcement = {
      id: Date.now(),
      ...newAnnouncement,
      createdAt: new Date().toISOString(),
      status: "sent",
      recipients: newAnnouncement.targetClass === "all" ? 135 : Math.floor(Math.random() * 50) + 20,
    }

    const updatedAnnouncements = [announcement, ...announcements]
    setAnnouncements(updatedAnnouncements)
    localStorage.setItem("announcements", JSON.stringify(updatedAnnouncements))

    setNewAnnouncement({
      title: "",
      message: "",
      type: "general",
      targetClass: "all",
      priority: "normal",
    })
    setIsCreateOpen(false)
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || announcement.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeColor = (type) => {
    switch (type) {
      case "assignment":
        return "bg-red-100 text-red-800"
      case "schedule":
        return "bg-blue-100 text-blue-800"
      case "material":
        return "bg-green-100 text-green-800"
      case "exam":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "normal":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">Manage and send announcements to your students</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>Send important updates and information to your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                    placeholder="Enter your announcement message"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={newAnnouncement.type}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="schedule">Schedule</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Target Class</Label>
                    <Select
                      value={newAnnouncement.targetClass}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, targetClass: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="CS101">CS101 - Computer Science</SelectItem>
                        <SelectItem value="DS201">DS201 - Data Structures</SelectItem>
                        <SelectItem value="ALG301">ALG301 - Algorithms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={newAnnouncement.priority}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="material">Material</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(announcement.priority)}`} />
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <Badge className={getTypeColor(announcement.type)}>{announcement.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{announcement.message}</p>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {announcement.recipients} recipients
                      </div>
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-1" />
                        {announcement.targetClass}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600">
                      {announcement.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first announcement to get started"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
