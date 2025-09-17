"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Upload,
  FileText,
  Video,
  ImageIcon,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  MoreVertical,
  Calendar,
  Users,
} from "lucide-react"

const ContentCard = ({ content, onView, onEdit, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case "syllabus":
        return <BookOpen className="w-5 h-5" />
      case "document":
        return <FileText className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "image":
        return <ImageIcon className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "syllabus":
        return "bg-blue-100 text-blue-700"
      case "document":
        return "bg-green-100 text-green-700"
      case "video":
        return "bg-purple-100 text-purple-700"
      case "image":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(content.type)}`}>{getIcon(content.type)}</div>
              <div>
                <CardTitle className="text-base">{content.title}</CardTitle>
                <CardDescription>{content.class}</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(content)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(content)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(content)} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Size</span>
              <span>{content.size}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uploaded</span>
              <span>{content.uploadDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Views</span>
              <span>{content.views}</span>
            </div>
            {content.progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completion</span>
                  <span>{content.progress}%</span>
                </div>
                <Progress value={content.progress} className="h-2" />
              </div>
            )}
            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onView(content)} className="flex-1 bg-transparent">
                <Eye className="mr-2 h-3 w-3" />
                View
              </Button>
              <Button size="sm" onClick={() => onEdit(content)} className="flex-1">
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    class: "",
    type: "document",
  })

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (files.length > 0 && uploadData.title && uploadData.class) {
      onUpload({
        ...uploadData,
        files,
        id: Date.now(),
        uploadDate: new Date().toLocaleDateString(),
        size: `${(files[0].size / 1024 / 1024).toFixed(1)} MB`,
        views: 0,
      })
      onClose()
      setFiles([])
      setUploadData({ title: "", description: "", class: "", type: "document" })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Upload Content</h3>
            <p className="text-muted-foreground">Add new course materials or syllabus</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="Enter content title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Class *</label>
              <select
                className="w-full p-2 border rounded-md"
                value={uploadData.class}
                onChange={(e) => setUploadData({ ...uploadData, class: e.target.value })}
              >
                <option value="">Select class</option>
                <option value="CS101">CS101 - Computer Science</option>
                <option value="DS201">DS201 - Data Structures</option>
                <option value="ALG301">ALG301 - Algorithms</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={uploadData.type}
                onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
              >
                <option value="document">Document</option>
                <option value="syllabus">Syllabus</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Brief description of the content"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              />
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or{" "}
                <label className="text-primary cursor-pointer hover:underline">
                  browse
                  <input type="file" className="hidden" multiple onChange={handleFileSelect} />
                </label>
              </p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, MP4, JPG, PNG</p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Files:</p>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleUpload} className="flex-1" disabled={!files.length || !uploadData.title}>
              Upload
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterClass, setFilterClass] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Course Syllabus - Fall 2024",
      class: "CS101",
      type: "syllabus",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      views: 156,
      progress: 85,
    },
    {
      id: 2,
      title: "Chapter 1: Introduction to Programming",
      class: "CS101",
      type: "document",
      size: "1.8 MB",
      uploadDate: "2024-01-18",
      views: 89,
      progress: 92,
    },
    {
      id: 3,
      title: "Data Structures Overview Video",
      class: "DS201",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-20",
      views: 67,
      progress: 78,
    },
    {
      id: 4,
      title: "Algorithm Complexity Diagram",
      class: "ALG301",
      type: "image",
      size: "0.8 MB",
      uploadDate: "2024-01-22",
      views: 34,
      progress: 65,
    },
    {
      id: 5,
      title: "Assignment Guidelines",
      class: "CS101",
      type: "document",
      size: "1.2 MB",
      uploadDate: "2024-01-24",
      views: 123,
      progress: 88,
    },
  ])

  const classes = ["CS101", "DS201", "ALG301"]
  const contentTypes = ["syllabus", "document", "video", "image"]

  const filteredContents = contents.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.class.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || content.type === filterType
    const matchesClass = filterClass === "all" || content.class === filterClass
    return matchesSearch && matchesType && matchesClass
  })

  const handleUpload = (newContent) => {
    setContents([newContent, ...contents])
  }

  const handleView = (content) => {
    console.log("Viewing content:", content)
    // In real app, open content viewer
  }

  const handleEdit = (content) => {
    console.log("Editing content:", content)
    // In real app, open edit modal
  }

  const handleDelete = (content) => {
    setContents(contents.filter((c) => c.id !== content.id))
  }

  const getTypeStats = () => {
    return contentTypes.map((type) => ({
      type,
      count: contents.filter((c) => c.type === type).length,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground">Upload and manage course materials, syllabi, and resources</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Content
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{contents.length}</p>
                <p className="text-sm text-muted-foreground">Total Files</p>
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
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(contents.reduce((sum, c) => sum + (c.progress || 0), 0) / contents.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{classes.length}</p>
                <p className="text-sm text-muted-foreground">Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-content">All Content</TabsTrigger>
          <TabsTrigger value="syllabi">Syllabi</TabsTrigger>
          <TabsTrigger value="modules">Course Modules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-content" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="syllabus">Syllabus</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="image">Images</option>
            </select>
            <select
              className="px-3 py-2 border rounded-md"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredContents.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No content found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Start by uploading your first content"}
              </p>
              <Button onClick={() => setShowUploadModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Upload Content
              </Button>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="syllabi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Syllabi</CardTitle>
              <CardDescription>Manage syllabi for all your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contents
                  .filter((c) => c.type === "syllabus")
                  .map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Organize content by chapters and modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((cls) => (
                  <div key={cls} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{cls}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {contents
                        .filter((c) => c.class === cls && c.type !== "syllabus")
                        .map((content) => (
                          <div key={content.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                {content.type === "document" && <FileText className="w-4 h-4 text-primary" />}
                                {content.type === "video" && <Video className="w-4 h-4 text-primary" />}
                                {content.type === "image" && <ImageIcon className="w-4 h-4 text-primary" />}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{content.title}</p>
                                <p className="text-xs text-muted-foreground">{content.class}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{content.progress}%</p>
                              <Progress value={content.progress} className="w-16 h-1" />
                            </div>
                          </div>
                        ))}
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
                <CardTitle>Content Type Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getTypeStats().map((stat) => (
                  <div key={stat.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stat.type}</span>
                      <span>{stat.count} files</span>
                    </div>
                    <Progress value={(stat.count / contents.length) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Viewed Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contents
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((content) => (
                      <div key={content.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{content.title}</p>
                          <p className="text-xs text-muted-foreground">{content.class}</p>
                        </div>
                        <Badge variant="secondary">{content.views} views</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onUpload={handleUpload} />
    </div>
  )
}
