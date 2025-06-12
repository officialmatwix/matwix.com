"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Users,
  Play,
  FileText,
  MessageSquare,
  Award,
  CheckCircle,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock course data
const courseData = {
  id: 1,
  title: "Quantum Network Marketing Fundamentals",
  description: "Learn the basics of network marketing in the quantum era and how to build your business from scratch.",
  longDescription:
    "This comprehensive course covers everything you need to know to get started with network marketing in the quantum era. You'll learn the fundamental principles, strategies for building your team, and techniques for growing your business exponentially. By the end of this course, you'll have a solid foundation to launch your successful network marketing career.",
  level: "Beginner",
  duration: "4 weeks",
  lessons: 12,
  instructor: {
    name: "John Smith",
    title: "Senior Network Marketing Consultant",
    bio: "John has over 15 years of experience in network marketing and has built multiple successful teams. He's a certified trainer and has helped thousands of people achieve success in the industry.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  rating: 4.8,
  reviews: 245,
  enrolled: 1245,
  image: "/placeholder.svg?height=400&width=800",
  category: "Business",
  progress: 65,
  lastActivity: "2023-09-15T14:30:00Z",
  modules: [
    {
      id: 1,
      title: "Introduction to Network Marketing",
      lessons: [
        { id: 1, title: "What is Network Marketing?", duration: "15 min", completed: true },
        { id: 2, title: "History and Evolution of MLM", duration: "20 min", completed: true },
        { id: 3, title: "Myths and Misconceptions", duration: "25 min", completed: true },
      ],
    },
    {
      id: 2,
      title: "Building Your Foundation",
      lessons: [
        { id: 4, title: "Setting Clear Goals", duration: "18 min", completed: true },
        { id: 5, title: "Creating Your Personal Brand", duration: "22 min", completed: true },
        { id: 6, title: "Identifying Your Target Market", duration: "20 min", completed: false },
      ],
    },
    {
      id: 3,
      title: "Recruitment Strategies",
      lessons: [
        { id: 7, title: "Finding Potential Team Members", duration: "25 min", completed: false },
        { id: 8, title: "Effective Presentation Techniques", duration: "30 min", completed: false },
        { id: 9, title: "Handling Objections", duration: "20 min", completed: false },
      ],
    },
    {
      id: 4,
      title: "Team Building and Leadership",
      lessons: [
        { id: 10, title: "Developing Leadership Skills", duration: "28 min", completed: false },
        { id: 11, title: "Training and Supporting Your Team", duration: "25 min", completed: false },
        { id: 12, title: "Creating a Duplicable System", duration: "22 min", completed: false },
      ],
    },
  ],
}

export default function CourseDetail() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate progress
  const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = courseData.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>

      <div className="relative rounded-xl overflow-hidden">
        <img src={courseData.image || "/placeholder.svg"} alt={courseData.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="p-6 w-full">
            <Badge className="mb-2 bg-green-500/80 text-white border-none">{courseData.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{courseData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>
                  {courseData.rating} ({courseData.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-400 mr-1" />
                <span>{courseData.enrolled.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-purple-400 mr-1" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-green-400 mr-1" />
                <span>{courseData.lessons} lessons</span>
              </div>
              <Badge
                className={`
                ${
                  courseData.level === "Beginner"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : courseData.level === "Intermediate"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                }
              `}
              >
                {courseData.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800/50 border border-slate-700/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-green-400"
              >
                <FileText className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-green-400"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="instructor"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-green-400"
              >
                <User className="h-4 w-4 mr-2" />
                Instructor
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-green-400"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{courseData.longDescription}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-slate-200 mb-3">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Understand the core principles of network marketing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Build and grow your personal brand</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Develop effective recruitment strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Create a duplicable system for your team</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Master objection handling techniques</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">Develop leadership skills to manage your team</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {completedLessons} of {totalLessons} lessons completed ({progressPercentage}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progressPercentage} className="h-2 mb-6" />

                  <div className="space-y-4">
                    {courseData.modules.map((module, index) => (
                      <div key={module.id} className="border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="bg-slate-700/30 p-4 flex items-center justify-between">
                          <h3 className="font-medium text-slate-200">
                            Module {index + 1}: {module.title}
                          </h3>
                          <span className="text-sm text-slate-400">
                            {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons
                          </span>
                        </div>
                        <div className="divide-y divide-slate-700/50">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between hover:bg-slate-700/20"
                            >
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  </div>
                                ) : (
                                  <div className="h-6 w-6 rounded-full border border-slate-600 mr-3" />
                                )}
                                <span className="text-slate-300">{lesson.title}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-slate-400 mr-3">{lesson.duration}</span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 rounded-full text-green-500 hover:text-green-400 hover:bg-green-500/10"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
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

            <TabsContent value="instructor" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle>Meet Your Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <Avatar className="h-24 w-24 rounded-lg border border-slate-700/50">
                      <AvatarImage src={courseData.instructor.avatar} alt={courseData.instructor.name} />
                      <AvatarFallback className="bg-slate-700 text-green-500 text-xl">
                        {courseData.instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-medium text-slate-200">{courseData.instructor.name}</h3>
                      <p className="text-green-500 mb-3">{courseData.instructor.title}</p>
                      <p className="text-slate-300 leading-relaxed">{courseData.instructor.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>Based on {courseData.reviews} reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-slate-100">{courseData.rating}</div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${star <= Math.floor(courseData.rating) ? "text-yellow-500" : "text-slate-600"}`}
                          fill={star <= Math.floor(courseData.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Mock reviews */}
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-slate-700 text-green-500">
                                {String.fromCharCode(64 + review)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-slate-200">Student {review}</div>
                              <div className="text-xs text-slate-400">2 weeks ago</div>
                            </div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= 5 - (review % 2) ? "text-yellow-500" : "text-slate-600"}`}
                                fill={star <= 5 - (review % 2) ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-300">
                          {review === 1
                            ? "This course exceeded my expectations! The content is well-structured and the instructor explains complex concepts in a simple way."
                            : review === 2
                              ? "Great course with practical examples. I've already started implementing what I've learned in my business."
                              : "The strategies taught in this course have helped me grow my team significantly. Highly recommended!"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="bg-slate-800/50 border-slate-700/50 sticky top-6">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={courseData.image || "/placeholder.svg"}
                  alt={courseData.title}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Button size="icon" className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 text-white">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Progress</span>
                    <span className="text-green-500 font-medium">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {progressPercentage > 0 ? (
                  <Button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 mb-3">
                    Continue Learning
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 mb-3">
                    Start Course
                  </Button>
                )}

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium text-slate-200">This Course Includes:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-slate-300">
                      <BookOpen className="h-4 w-4 text-green-500 mr-2" />
                      {courseData.lessons} lessons
                    </li>
                    <li className="flex items-center text-slate-300">
                      <Clock className="h-4 w-4 text-green-500 mr-2" />
                      {courseData.duration} of content
                    </li>
                    <li className="flex items-center text-slate-300">
                      <Award className="h-4 w-4 text-green-500 mr-2" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center text-slate-300">
                      <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                      Direct instructor support
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
