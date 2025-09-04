import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  BookOpen, 
  Star, 
  Eye, 
  ThumbsUp, 
  Clock, 
  Tag,
  Plus,
  Filter,
  TrendingUp,
  Users,
  FileText,
  Video,
  ExternalLink
} from "lucide-react";

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  rating: number;
  lastUpdated: Date;
  author: string;
  type: "article" | "video" | "guide";
  content: string;
  featured: boolean;
}

const mockArticles: KnowledgeArticle[] = [
  {
    id: "KB-001",
    title: "How to Reset Your Email Password",
    category: "Email Support",
    tags: ["password", "email", "security"],
    views: 1250,
    likes: 45,
    rating: 4.8,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    author: "Sarah Johnson",
    type: "article",
    content: "Step-by-step guide to reset your email password...",
    featured: true
  },
  {
    id: "KB-002",
    title: "Setting Up VPN Access",
    category: "Network",
    tags: ["vpn", "security", "network"],
    views: 890,
    likes: 32,
    rating: 4.6,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    author: "Mike Chen",
    type: "guide",
    content: "Complete guide for setting up VPN access...",
    featured: false
  },
  {
    id: "KB-003", 
    title: "Software Installation Tutorial",
    category: "Software",
    tags: ["installation", "software", "tutorial"],
    views: 670,
    likes: 28,
    rating: 4.5,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    author: "Anna Wilson",
    type: "video",
    content: "Video tutorial showing software installation process...",
    featured: true
  },
  {
    id: "KB-004",
    title: "Troubleshooting Network Connectivity",
    category: "Network",
    tags: ["network", "troubleshooting", "connectivity"],
    views: 1100,
    likes: 52,
    rating: 4.7,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    author: "David Brown",
    type: "article",
    content: "Common network connectivity issues and solutions...",
    featured: false
  }
];

const categories = [
  { name: "All Articles", count: 24, color: "primary" },
  { name: "Email Support", count: 8, color: "success" },
  { name: "Network", count: 6, color: "warning" },
  { name: "Software", count: 5, color: "destructive" },
  { name: "Hardware", count: 3, color: "muted" },
  { name: "Security", count: 2, color: "priority-high" }
];

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "guide": return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
            ← Back to Knowledge Base
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like ({selectedArticle.likes})
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(selectedArticle.type)}
                  <Badge variant="outline">{selectedArticle.category}</Badge>
                  {selectedArticle.featured && (
                    <Badge variant="default">Featured</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold">{selectedArticle.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>By {selectedArticle.author}</span>
                  <span>•</span>
                  <span>Updated {formatDate(selectedArticle.lastUpdated)}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{selectedArticle.views} views</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span>{selectedArticle.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{selectedArticle.content}</p>
              
              {/* Simulated article content */}
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p>This comprehensive guide will walk you through the process step by step. Whether you're a beginner or experienced user, these instructions will help you achieve your goal efficiently.</p>
                
                <h2 className="text-2xl font-semibold">Prerequisites</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Administrative access to your system</li>
                  <li>Stable internet connection</li>
                  <li>Latest version of required software</li>
                </ul>

                <h2 className="text-2xl font-semibold">Step-by-Step Instructions</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">Step 1: Initial Setup</h3>
                    <p>Begin by accessing the main dashboard and navigating to the settings section.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">Step 2: Configuration</h3>
                    <p>Configure the necessary parameters according to your specific requirements.</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">Step 3: Verification</h3>
                    <p>Test the configuration to ensure everything is working correctly.</p>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold">Troubleshooting</h2>
                <p>If you encounter any issues during the process, refer to our troubleshooting section or contact our support team for assistance.</p>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Was this helpful?</span>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Knowledge Base</h2>
          <p className="text-muted-foreground">Self-service help articles and guides</p>
        </div>
        <Button variant="gradient">
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search articles, guides, and tutorials..."
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">145</div>
              <p className="text-sm text-muted-foreground">Total Articles</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.name 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-accent"
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Popular This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm">+23% views</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Network troubleshooting articles are trending
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredArticles.length} articles found
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(article.type)}
                        <Badge variant="outline">{article.category}</Badge>
                        {article.featured && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {article.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{article.author}</span>
                      </div>
                      <span>{formatDate(article.lastUpdated)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{article.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span>{article.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;