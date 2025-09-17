"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Upload,
  FileText,
  Video,
  ImageIcon,
  Download,
  Eye,
  Edit,
  Plus,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ClassContentPage() {
  const params = useParams()
  const [classData, setClassData] = useState(null)
  const [contents, setContents] = useState([])

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockClass = {
      id: params.classId,
      subject: "Introduction to Computer Science",
      code: "CS101",
      students: 45,
    }

    const mockContents = [
      {
        id: 1,
        title: "Course Syllabus - Fall 2024",
        type: "syllabus",
        size: "2.3 MB",
        uploadDate: "2024-01-15",
        views: 156,
        progress: 85,
        module: "Course Overview",
      },
      {
        id: 2,
        title: "Chapter 1: Introduction to Programming",
        type: "document",
        size: "1.8 MB",
        uploadDate: "2024-01-18",
        views: 89,
        progress: 92,
        module: "Module 1",
      },
      {
        id: 3,
        title: "Programming Basics Video Lecture",
        type: "video",
        size: "45.2 MB",
        uploadDate: "2024-01-20",
        views: 67,
        progress: 78,
        module: "Module 1",
      },
      {
        id: 4,
        title: "Variables and Data Types",
        type: "document",
        size: "1.2 MB",
        uploadDate: "2024-01-22",
        views: 34,
        progress: 65,
        module: "Module 2",
      },
    ]

    setClassData(mockClass)
    setContents(mockContents)
  }, [params.classId])

  const modules = [
    {
      id: 1,
      name: "Course Overview",
      description: "Introduction and course structure",
      progress: 85,
      items: contents.filter((c) => c.module === "Course Overview"),
    },
    {
      id: 2,
      name: "Module 1: Programming Fundamentals",
      description: "Basic programming concepts and syntax",
      progress: 85,
      items: contents.filter((c) => c.module === "Module 1"),
    },
    {
      id: 3,
      name: "Module 2: Data Types and Variables",
      description: "Understanding data types and variable manipulation",
      progress: 65,
      items: contents.filter((c) => c.module === "Module 2"),
    },
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
          <Link href={`/dashboard/classes/${classData.id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Class
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Course Content</h1>
            <p className="text-muted-foreground">
              {classData.subject} ({classData.code})
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{contents.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{contents.reduce((sum, c) => sum + c.views, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(contents.reduce((sum, c) => sum + c.progress, 0) / contents.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{modules.length}</p>
                <p className="text-sm text-muted-foreground">Modules</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Course Modules</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="all-content">All Content</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{module.name}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{module.progress}%</p>
                        <p className="text-xs text-muted-foreground">Completion</p>
                      </div>
                    </div>
                    <Progress value={module.progress} className="mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {module.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              {item.type === "syllabus" && <BookOpen className="w-5 h-5 text-primary" />}
                              {item.type === "document" && <FileText className="w-5 h-5 text-primary" />}
                              {item.type === "video" && <Video className="w-5 h-5 text-primary" />}
                              {item.type === "image" && <ImageIcon className="w-5 h-5 text-primary" />}
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.size} • {item.views} views • {item.uploadDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right mr-4">
                              <p className="text-sm font-medium">{item.progress}%</p>
                              <Progress value={item.progress} className="w-16 h-1" />
                            </div>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Eye className="mr-2 h-3 w-3" />
                              View
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                      {module.items.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No content in this module yet</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Syllabus</CardTitle>
              <CardDescription>Official syllabus and course outline</CardDescription>
            </CardHeader>
            <CardContent>
              {contents.filter((c) => c.type === "syllabus").length > 0 ? (
                <div className="space-y-4">
                  {contents
                    .filter((c) => c.type === "syllabus")
                    .map((syllabus) => (
                      <div key={syllabus.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{syllabus.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {syllabus.size} • Uploaded {syllabus.uploadDate} • {syllabus.views} views
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Syllabus Uploaded</h3>
                  <p className="text-muted-foreground mb-4">Upload your course syllabus to get started</p>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Syllabus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Course Materials</CardTitle>
              <CardDescription>Complete list of uploaded content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contents.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {content.type === "syllabus" && <BookOpen className="w-5 h-5 text-primary" />}
                        {content.type === "document" && <FileText className="w-5 h-5 text-primary" />}
                        {content.type === "video" && <Video className="w-5 h-5 text-primary" />}
                        {content.type === "image" && <ImageIcon className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium">{content.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {content.module} • {content.size} • {content.views} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{content.progress}%</p>
                        <Progress value={content.progress} className="w-16 h-1" />
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {content.type}
                      </Badge>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
