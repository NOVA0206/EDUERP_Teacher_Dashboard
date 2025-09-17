"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Calendar, Clock, MoreVertical, Plus, Search, BookOpen, QrCode, Settings, Eye } from "lucide-react"
import Link from "next/link"

const ClassCard = ({ classData, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{classData.subject}</CardTitle>
            <CardDescription>{classData.code}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/classes/${classData.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/classes/${classData.id}/attendance`}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Take Attendance
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/classes/${classData.id}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{classData.students} students</span>
            </div>
            <Badge variant={classData.status === "active" ? "default" : "secondary"}>{classData.status}</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{classData.schedule}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{classData.duration}</span>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Semester {classData.semester}</span>
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Attendance Rate</span>
              <span className="text-sm font-medium text-green-600">{classData.attendanceRate}%</span>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Link href={`/dashboard/classes/${classData.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Details
              </Button>
            </Link>
            <Link href={`/dashboard/classes/${classData.id}/attendance`} className="flex-1">
              <Button size="sm" className="w-full">
                Take Attendance
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data - in real app, this would come from API
  const classes = [
    {
      id: "cs101",
      subject: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
      status: "active",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      duration: "1.5 hours",
      semester: "Fall 2024",
      attendanceRate: 92,
    },
    {
      id: "ds201",
      subject: "Data Structures and Algorithms",
      code: "DS201",
      students: 38,
      status: "active",
      schedule: "Tue, Thu - 2:00 PM",
      duration: "2 hours",
      semester: "Fall 2024",
      attendanceRate: 88,
    },
    {
      id: "alg301",
      subject: "Advanced Algorithms",
      code: "ALG301",
      students: 25,
      status: "active",
      schedule: "Mon, Wed - 4:00 PM",
      duration: "1.5 hours",
      semester: "Fall 2024",
      attendanceRate: 96,
    },
    {
      id: "db401",
      subject: "Database Management Systems",
      code: "DB401",
      students: 32,
      status: "active",
      schedule: "Tue, Thu - 10:00 AM",
      duration: "2 hours",
      semester: "Fall 2024",
      attendanceRate: 85,
    },
    {
      id: "web301",
      subject: "Web Development",
      code: "WEB301",
      students: 28,
      status: "scheduled",
      schedule: "Fri - 1:00 PM",
      duration: "3 hours",
      semester: "Spring 2025",
      attendanceRate: 0,
    },
  ]

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || classItem.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Classes</h1>
            <p className="text-muted-foreground">Manage your assigned classes and schedules</p>
          </div>
          <Link href="/dashboard/classes/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Class
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{classes.length}</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{classes.filter((c) => c.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
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
              <QrCode className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(
                    classes.filter((c) => c.status === "active").reduce((sum, c) => sum + c.attendanceRate, 0) /
                      classes.filter((c) => c.status === "active").length,
                  )}
                  %
                </p>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter: {filterStatus === "all" ? "All Classes" : filterStatus}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Classes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("scheduled")}>Scheduled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((classItem, index) => (
          <ClassCard key={classItem.id} classData={classItem} index={index} />
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No classes found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first class"}
          </p>
          <Link href="/dashboard/classes/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Class
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
