import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  VideoIcon, 
  MoreHorizontal,
  User,
  Clock,
  CheckCheck
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "customer" | "agent";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

interface ChatSession {
  id: string;
  customerName: string;
  customerEmail: string;
  status: "active" | "waiting" | "resolved";
  priority: "high" | "medium" | "low";
  channel: "chat" | "email" | "phone" | "social";
  lastMessage: string;
  unreadCount: number;
  timestamp: Date;
}

const mockChatSessions: ChatSession[] = [
  {
    id: "CHT-001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@company.com",
    status: "active",
    priority: "high",
    channel: "chat",
    lastMessage: "I'm having trouble accessing my email...",
    unreadCount: 2,
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: "CHT-002", 
    customerName: "Mike Chen",
    customerEmail: "mike@startup.com",
    status: "waiting",
    priority: "medium",
    channel: "chat",
    lastMessage: "Can you help me with software installation?",
    unreadCount: 1,
    timestamp: new Date(Date.now() - 15 * 60000)
  },
  {
    id: "CHT-003",
    customerName: "Emma Wilson",
    customerEmail: "emma@corp.com", 
    status: "active",
    priority: "low",
    channel: "chat",
    lastMessage: "Thank you for the help!",
    unreadCount: 0,
    timestamp: new Date(Date.now() - 30 * 60000)
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hi, I'm having trouble accessing my email account. It keeps saying my password is incorrect but I'm sure it's right.",
    sender: "customer",
    timestamp: new Date(Date.now() - 10 * 60000),
    status: "read"
  },
  {
    id: "2", 
    text: "Hello Sarah! I'm here to help you with that. Let me check your account status. Can you confirm your email address for me?",
    sender: "agent",
    timestamp: new Date(Date.now() - 8 * 60000),
    status: "read"
  },
  {
    id: "3",
    text: "Yes, it's sarah@company.com",
    sender: "customer", 
    timestamp: new Date(Date.now() - 6 * 60000),
    status: "read"
  },
  {
    id: "4",
    text: "Perfect! I can see your account. It looks like there was a security lockout due to multiple failed login attempts. I'm resetting that now. Please try logging in again in about 2 minutes.",
    sender: "agent",
    timestamp: new Date(Date.now() - 3 * 60000),
    status: "delivered"
  }
];

const LiveChatWidget = () => {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(mockChatSessions[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "agent",
      timestamp: new Date(),
      status: "sent"
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate customer typing
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const customerReply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you! That worked perfectly.",
          sender: "customer",
          timestamp: new Date(),
          status: "read"
        };
        setMessages(prev => [...prev, customerReply]);
      }, 2000);
    }, 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-priority-high border-priority-high";
      case "medium": return "text-priority-medium border-priority-medium";
      case "low": return "text-priority-low border-priority-low";
      default: return "text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "waiting": return "bg-warning";
      case "resolved": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="flex h-[700px] border rounded-lg overflow-hidden shadow-medium">
      {/* Chat Sessions Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Active Chats</h3>
          <p className="text-sm text-muted-foreground">3 conversations</p>
        </div>
        <ScrollArea className="h-full">
          <div className="p-2">
            {mockChatSessions.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  selectedChat?.id === chat.id 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{chat.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(chat.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{chat.customerName}</p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(chat.priority)}`}>
                          {chat.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{selectedChat.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{selectedChat.customerName}</h4>
                    <p className="text-sm text-muted-foreground">{selectedChat.customerEmail}</p>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(selectedChat.priority)}>
                    {selectedChat.priority} priority
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <VideoIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "agent" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "agent"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.sender === "agent" && (
                          <div className="text-xs opacity-70">
                            {message.status === "sent" && <Clock className="h-3 w-3" />}
                            {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                            {message.status === "read" && <CheckCheck className="h-3 w-3 text-success" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} variant="gradient">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChatWidget;