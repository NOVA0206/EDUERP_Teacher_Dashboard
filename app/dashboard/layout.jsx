"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  QrCode,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Classes",
    href: "/dashboard/classes",
    icon: Users,
    badge: "8",
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: QrCode,
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: BookOpen,
  },
  {
    title: "Announcements",
    href: "/dashboard/announcements",
    icon: Bell,
    badge: "3",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

function Sidebar({ className = "", onLogout }) {
  const pathname = usePathname()

  return (
    <div className={`pb-12 ${className}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <GraduationCap className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-2xl font-bold">EduERP</h2>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.href ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopNavbar({ teacher, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  const handleProfileClick = () => {
    router.push("/dashboard/profile")
  }

  const handleSettingsClick = () => {
    router.push("/dashboard/settings")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span className="hidden font-bold sm:inline-block">Home</span>
          </Link>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Sidebar onLogout={onLogout} />
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <h1 className="text-lg font-semibold md:hidden">Dashboard</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={teacher?.name} />
                    <AvatarFallback>
                      {teacher?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{teacher?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{teacher?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{teacher?.department}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default function DashboardLayout({ children }) {
  const [teacher, setTeacher] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Check for authentication
    const session = localStorage.getItem("teacherSession")
    if (!session) {
      router.push("/auth/login")
      return
    }

    try {
      const teacherData = JSON.parse(session)
      setTeacher(teacherData)
    } catch (error) {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("teacherSession")
    router.push("/auth/logout")
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar teacher={teacher} onLogout={handleLogout} />
      <div className="flex">
        <aside className="hidden w-64 border-r bg-muted/10 md:block">
          <Sidebar onLogout={handleLogout} />
        </aside>
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
