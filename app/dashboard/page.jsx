"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  QrCode,
  BookOpen,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const StatCard = ({ title, value, description, icon: Icon, trend, color = "primary" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
)

const QuickActionCard = ({ title, description, icon: Icon, href, color = "primary" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <Link href={href}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-${color}/10 group-hover:bg-${color}/20 transition-colors`}>
              <Icon className={`h-6 w-6 text-${color}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
)

const RecentActivity = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Your latest actions and updates</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`p-2 rounded-full bg-${activity.color}/10`}>
              <activity.icon className={`h-4 w-4 text-${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            {activity.badge && <Badge variant="secondary">{activity.badge}</Badge>}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const UpcomingClasses = ({ classes }) => (
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Classes</CardTitle>
      <CardDescription>Your schedule for today</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {classes.map((classItem, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">{classItem.subject}</p>
              <p className="text-sm text-muted-foreground">{classItem.room}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{classItem.time}</p>
              <Badge variant={classItem.status === "upcoming" ? "default" : "secondary"}>{classItem.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const [teacher, setTeacher] = useState(null)

  useEffect(() => {
    const session = localStorage.getItem("teacherSession")
    if (session) {
      setTeacher(JSON.parse(session))
    }
  }, [])

  const recentActivities = [
    {
      title: "Started attendance for CS101",
      time: "2 minutes ago",
      icon: QrCode,
      color: "primary",
    },
    {
      title: "Uploaded new syllabus",
      time: "1 hour ago",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Sent announcement to Math202",
      time: "3 hours ago",
      icon: Bell,
      color: "blue",
      badge: "New",
    },
    {
      title: "Updated class schedule",
      time: "Yesterday",
      icon: Calendar,
      color: "orange",
    },
  ]

  const upcomingClasses = [
    {
      subject: "Computer Science 101",
      room: "Room A-204",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      subject: "Data Structures",
      room: "Lab B-105",
      time: "2:00 PM",
      status: "upcoming",
    },
    {
      subject: "Algorithms",
      room: "Room C-301",
      time: "4:00 PM",
      status: "scheduled",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {teacher?.name?.split(" ")[0] || "Teacher"}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your classes today.</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Classes"
          value="8"
          description="Active this semester"
          icon={Users}
          trend="+2 from last month"
        />
        <StatCard
          title="Attendance Rate"
          value="94%"
          description="Average across all classes"
          icon={CheckCircle}
          trend="+5% from last week"
          color="green"
        />
        <StatCard title="Upcoming Sessions" value="3" description="Scheduled for today" icon={Calendar} color="blue" />
        <StatCard
          title="Pending Tasks"
          value="5"
          description="Require your attention"
          icon={AlertCircle}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Start Attendance"
            description="Generate QR code for current class"
            icon={QrCode}
            href="/dashboard/attendance"
          />
          <QuickActionCard
            title="Add New Class"
            description="Create a new class entry"
            icon={Plus}
            href="/dashboard/classes/add"
            color="green"
          />
          <QuickActionCard
            title="Upload Content"
            description="Add syllabus or course materials"
            icon={BookOpen}
            href="/dashboard/content"
            color="blue"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <UpcomingClasses classes={upcomingClasses} />

          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>This week's attendance statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CS101 - Computer Science</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>DS201 - Data Structures</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ALG301 - Algorithms</span>
                  <span>96%</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <RecentActivity activities={recentActivities} />

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
              <CardDescription>Latest updates sent to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium">Assignment Due Reminder</p>
                  <p className="text-sm text-muted-foreground">CS101 - Due tomorrow at 11:59 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Sent 2 hours ago</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium">Class Rescheduled</p>
                  <p className="text-sm text-muted-foreground">DS201 - Moved to Friday 2:00 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Sent yesterday</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium">New Study Materials</p>
                  <p className="text-sm text-muted-foreground">ALG301 - Chapter 5 notes uploaded</p>
                  <p className="text-xs text-muted-foreground mt-1">Sent 3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
