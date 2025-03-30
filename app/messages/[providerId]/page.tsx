"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Send, ArrowLeft, Phone, Calendar, Info } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

export default function MessagesPage({ params }) {
  const { providerId } = params
  const [isLoading, setIsLoading] = useState(true)
  const [provider, setProvider] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Simulate API calls to fetch data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, these would be actual API calls
        await Promise.all([fetchProvider(), fetchMessages()])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [providerId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchProvider = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data
    setProvider({
      id: providerId,
      name: "AutoFix Pro",
      image: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastActive: new Date(),
      phone: "+1 (555) 123-4567",
    })
  }

  const fetchMessages = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data - generate conversation
    const now = new Date()

    setMessages([
      {
        id: "m1",
        sender: "provider",
        text: "Hello! How can I help you with your vehicle today?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      },
      {
        id: "m2",
        sender: "user",
        text: "Hi, I'm having an issue with my brakes. They're making a squeaking noise when I press them.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5), // 5 minutes later
      },
      {
        id: "m3",
        sender: "provider",
        text: "That could be a sign that your brake pads are worn and need replacement. When did you last have them checked?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 10 minutes later
      },
      {
        id: "m4",
        sender: "user",
        text: "It's been about a year since my last brake service.",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), // 15 minutes later
      },
      {
        id: "m5",
        sender: "provider",
        text: "I'd recommend bringing your car in for a brake inspection. We can check the condition of your brake pads and rotors. Would you like to schedule an appointment?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 20), // 20 minutes later
      },
      {
        id: "m6",
        sender: "user",
        text: "Yes, that would be great. When do you have availability?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 25), // 25 minutes later
      },
      {
        id: "m7",
        sender: "provider",
        text: "We have openings tomorrow afternoon or Friday morning. Which would work better for you?",
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 30 minutes later
      },
    ])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add new message to the list
    const newMsg = {
      id: `m${messages.length + 1}`,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate provider response after a delay
    setTimeout(() => {
      const responseMsg = {
        id: `m${messages.length + 2}`,
        sender: "provider",
        text: "Great! I've scheduled your appointment. We'll see you then. Let me know if you have any other questions.",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, responseMsg])

      toast.success("New message received", {
        description: "AutoFix Pro has responded to your message.",
      })
    }, 3000)
  }

  const formatMessageTime = (timestamp) => {
    const now = new Date()
    const messageDate = new Date(timestamp)

    // If message is from today, show time
    if (messageDate.toDateString() === now.toDateString()) {
      return format(messageDate, "h:mm a")
    }

    // If message is from yesterday, show "Yesterday"
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }

    // Otherwise show date
    return format(messageDate, "MMM d")
  }

  const formatMessageDate = (timestamp, index) => {
    const messageDate = new Date(timestamp)

    // Show date separator for first message
    if (index === 0) {
      return format(messageDate, "EEEE, MMMM d, yyyy")
    }

    // Show date separator when date changes
    const prevMessageDate = new Date(messages[index - 1].timestamp)
    if (messageDate.toDateString() !== prevMessageDate.toDateString()) {
      return format(messageDate, "EEEE, MMMM d, yyyy")
    }

    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
            ) : (
              <Card className="flex h-[calc(100vh-12rem)] flex-col">
                <CardHeader className="border-b px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button asChild variant="ghost" size="icon" className="md:hidden">
                        <Link href="/dashboard?tab=messages">
                          <ArrowLeft className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Avatar>
                        <AvatarImage src={provider?.image} alt={provider?.name} />
                        <AvatarFallback>{provider?.name?.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{provider?.name}</CardTitle>
                        <p className="text-xs text-gray-500">
                          {provider?.status === "online" ? (
                            <span className="flex items-center">
                              <span className="mr-1.5 h-2 w-2 rounded-full bg-rudzz-green"></span>
                              Online
                            </span>
                          ) : (
                            <span>Last active {format(provider?.lastActive, "h:mm a")}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Call">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button asChild variant="ghost" size="icon" title="Book Appointment">
                        <Link href={`/booking/${providerId}`}>
                          <Calendar className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="icon" title="Provider Info">
                        <Link href={`/providers/${providerId}`}>
                          <Info className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={message.id}>
                        {formatMessageDate(message.timestamp, index) && (
                          <div className="my-4 flex items-center justify-center">
                            <div className="text-xs font-medium text-gray-500">
                              {formatMessageDate(message.timestamp, index)}
                            </div>
                          </div>
                        )}
                        <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                            {message.sender === "provider" && (
                              <div className="mb-1 flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={provider?.image} alt={provider?.name} />
                                  <AvatarFallback>{provider?.name?.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs font-medium">{provider?.name}</span>
                              </div>
                            )}
                            <div className="flex items-end gap-2">
                              {message.sender === "user" && (
                                <div className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</div>
                              )}
                              <div
                                className={`rounded-lg px-4 py-2 ${
                                  message.sender === "user" ? "bg-rudzz-blue text-white" : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                <p>{message.text}</p>
                              </div>
                              {message.sender === "provider" && (
                                <div className="text-xs text-gray-500">{formatMessageTime(message.timestamp)}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-rudzz-blue hover:bg-rudzz-blue/90">
                      <Send className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Send</span>
                    </Button>
                  </form>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

