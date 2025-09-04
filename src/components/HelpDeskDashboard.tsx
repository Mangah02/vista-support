import { useState } from "react";
import LiveChatWidget from "./LiveChatWidget";
import KnowledgeBase from "./KnowledgeBase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Search, 
  Bell, 
  Settings, 
  MessageCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Headphones,
  BarChart3,
  Filter,
  Plus
} from "lucide-react";

const ticketData = [
  { name: "Mon", new: 24, resolved: 20, pending: 8 },
  { name: "Tue", new: 30, resolved: 25, pending: 12 },
  { name: "Wed", new: 18, resolved: 22, pending: 6 },
  { name: "Thu", new: 35, resolved: 28, pending: 15 },
  { name: "Fri", new: 42, resolved: 38, pending: 18 },
  { name: "Sat", new: 15, resolved: 12, pending: 5 },
  { name: "Sun", new: 8, resolved: 10, pending: 3 }
];

const channelData = [
  { name: "Email", value: 45, color: "hsl(var(--primary))" },
  { name: "Chat", value: 30, color: "hsl(var(--success))" },
  { name: "Phone", value: 20, color: "hsl(var(--warning))" },
  { name: "Social", value: 5, color: "hsl(var(--destructive))" }
];

const responseTimeData = [
  { time: "9AM", avg: 2.5 },
  { time: "10AM", avg: 1.8 },
  { time: "11AM", avg: 3.2 },
  { time: "12PM", avg: 2.1 },
  { time: "1PM", avg: 4.5 },
  { time: "2PM", avg: 2.8 },
  { time: "3PM", avg: 1.9 }
];

const recentTickets = [
  {
    id: "TCK-001",
    title: "Email server down",
    customer: "John Smith",
    priority: "high",
    channel: "email",
    status: "open",
    time: "2 min ago",
    agent: "Sarah"
  },
  {
    id: "TCK-002", 
    title: "Password reset request",
    customer: "Emily Johnson",
    priority: "medium",
    channel: "chat",
    status: "in-progress",
    time: "15 min ago",
    agent: "Mike"
  },
  {
    id: "TCK-003",
    title: "Software installation help",
    customer: "David Wilson",
    priority: "low",
    channel: "phone",
    status: "resolved",
    time: "1 hour ago", 
    agent: "Anna"
  }
];

const HelpDeskDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "muted";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-4 w-4" />;
      case "chat": return <MessageCircle className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "social": return <MessageSquare className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Headphones className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ICT Help Desk
              </h1>
            </div>
            <nav className="flex space-x-6">
              <Button 
                variant={activeView === "dashboard" ? "default" : "ghost"}
                onClick={() => setActiveView("dashboard")}
                className="font-medium"
              >
                Dashboard
              </Button>
              <Button 
                variant={activeView === "tickets" ? "default" : "ghost"}
                onClick={() => setActiveView("tickets")}
                className="font-medium"
              >
                Tickets
              </Button>
              <Button 
                variant={activeView === "analytics" ? "default" : "ghost"}
                onClick={() => setActiveView("analytics")}
                className="font-medium"
              >
                Analytics
              </Button>
              <Button 
                variant={activeView === "knowledge" ? "default" : "ghost"}
                onClick={() => setActiveView("knowledge")}
                className="font-medium"
              >
                Knowledge Base
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search tickets..."
                className="w-64 pl-10"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeView === "tickets" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Unified Inbox</h2>
              <Button variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
            <LiveChatWidget />
          </div>
        )}

        {activeView === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from yesterday
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-success">
                    -8% improvement
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">
                    Goal: 100 tickets
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-success">
                    +0.2 from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Weekly Ticket Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ticketData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="new" fill="hsl(var(--primary))" name="New" />
                      <Bar dataKey="resolved" fill="hsl(var(--success))" name="Resolved" />
                      <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Channel Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tickets */}
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Tickets</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(ticket.channel)}
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{ticket.title}</h4>
                          <p className="text-sm text-muted-foreground">{ticket.customer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant="outline" 
                          className={`border-${getPriorityColor(ticket.priority)} text-${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge variant={ticket.status === "resolved" ? "default" : "secondary"}>
                          {ticket.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{ticket.time}</span>
                        <span className="text-sm font-medium">Agent: {ticket.agent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "analytics" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
              <Button>Export Report</Button>
            </div>
            
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="avg" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Avg Response Time (hours)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "knowledge" && (
          <KnowledgeBase />
        )}
      </main>
    </div>
  );
};

export default HelpDeskDashboard;
