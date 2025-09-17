"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Edit,
  Save,
  Camera,
  CheckCircle,
  Clock,
  GraduationCap,
} from "lucide-react"

export default function ProfilePage() {
  const [teacher, setTeacher] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    office: "",
    bio: "",
    specialization: "",
    experience: "",
    education: "",
  })

  useEffect(() => {
    // Get teacher data from session
    const session = localStorage.getItem("teacherSession")
    if (session) {
      const teacherData = {
        ...JSON.parse(session),
        email: "sarah.johnson@university.edu",
        phone: "+1 (555) 123-4567",
        office: "Room B-301",
        bio: "Passionate computer science educator with over 10 years of experience in teaching programming fundamentals and advanced algorithms. Dedicated to making complex concepts accessible to students.",
        specialization: "Algorithms, Data Structures, Software Engineering",
        experience: "10+ years",
        education: "Ph.D. in Computer Science, MIT",
        joinDate: "September 2014",
        totalClasses: 8,
        totalStudents: 245,
        avgRating: 4.8,
      }
      setTeacher(teacherData)
      setFormData({
        name: teacherData.name,
        email: teacherData.email,
        phone: teacherData.phone,
        department: teacherData.department,
        office: teacherData.office,
        bio: teacherData.bio,
        specialization: teacherData.specialization,
        experience: teacherData.experience,
        education: teacherData.education,
      })
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update teacher data
      const updatedTeacher = { ...teacher, ...formData }
      setTeacher(updatedTeacher)

      // Update session storage
      localStorage.setItem("teacherSession", JSON.stringify(updatedTeacher))

      setIsEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to save profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      office: teacher.office,
      bio: teacher.bio,
      specialization: teacher.specialization,
      experience: teacher.experience,
      education: teacher.education,
    })
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!teacher) {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Profile updated successfully!</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={teacher.name} />
                    <AvatarFallback className="text-2xl">
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      variant="secondary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{teacher.name}</h3>
                  <p className="text-muted-foreground">{teacher.department}</p>
                  <Badge variant="secondary" className="mt-2">
                    {teacher.erpId}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{teacher.totalClasses}</p>
                    <p className="text-xs text-muted-foreground">Classes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{teacher.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{teacher.avgRating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined</span>
                </div>
                <span className="text-sm font-medium">{teacher.joinDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Experience</span>
                </div>
                <span className="text-sm font-medium">{teacher.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Rating</span>
                </div>
                <span className="text-sm font-medium">{teacher.avgRating}/5.0</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic contact and personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="office">Office Location</Label>
                        {isEditing ? (
                          <Input
                            id="office"
                            value={formData.office}
                            onChange={(e) => handleChange("office", e.target.value)}
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.office}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={(e) => handleChange("bio", e.target.value)}
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <div className="p-3 bg-muted/50 rounded">
                          <p className="text-sm">{teacher.bio}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>Your department and professional details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select
                            value={formData.department}
                            onValueChange={(value) => handleChange("department", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="Mathematics">Mathematics</SelectItem>
                              <SelectItem value="Physics">Physics</SelectItem>
                              <SelectItem value="Chemistry">Chemistry</SelectItem>
                              <SelectItem value="Biology">Biology</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.department}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        {isEditing ? (
                          <Input
                            id="experience"
                            value={formData.experience}
                            onChange={(e) => handleChange("experience", e.target.value)}
                            placeholder="e.g., 10+ years"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{teacher.experience}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      {isEditing ? (
                        <Input
                          id="specialization"
                          value={formData.specialization}
                          onChange={(e) => handleChange("specialization", e.target.value)}
                          placeholder="Your areas of expertise"
                        />
                      ) : (
                        <div className="p-2 bg-muted/50 rounded">
                          <span>{teacher.specialization}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{teacher.totalStudents}</p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{teacher.totalClasses}</p>
                        <p className="text-sm text-muted-foreground">Active Classes</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Award className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{teacher.avgRating}</p>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Background</CardTitle>
                    <CardDescription>Your educational qualifications and achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      {isEditing ? (
                        <Textarea
                          id="education"
                          rows={3}
                          value={formData.education}
                          onChange={(e) => handleChange("education", e.target.value)}
                          placeholder="Your educational background"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span>{teacher.education}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-semibold">Achievements & Certifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <Award className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">Excellence in Teaching Award</p>
                            <p className="text-sm text-muted-foreground">University Recognition - 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <Award className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">Best Faculty Award</p>
                            <p className="text-sm text-muted-foreground">Computer Science Department - 2022</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                          <Award className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium">Research Publication</p>
                            <p className="text-sm text-muted-foreground">15+ peer-reviewed papers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
