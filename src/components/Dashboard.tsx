import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Play, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
}

interface DashboardProps {
  username: string;
  course: string;
  onLogout: () => void;
}

// Initialize sample videos in localStorage
const initializeVideos = () => {
  const existingVideos = localStorage.getItem("courseVideos");
  if (!existingVideos) {
    const sampleVideos: Video[] = [
      {
        id: 1,
        title: "Introduction to the Courses",
        description: "Welcome to the course! Learn what you'll master.",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
        duration: "1:00",
        url: "https://drive.google.com/file/d/1ZFmHEBWe0dXpgyXNpiIxHR73cEVwjSrt/view",
      },
      {
        id: 2,
        title: "Getting Started with Basics",
        description: "Understanding the fundamental concepts.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
        duration: "12:45",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 3,
        title: "Core Concepts Deep Dive",
        description: "Exploring advanced topics in detail.",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop",
        duration: "18:20",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 4,
        title: "Practical Examples",
        description: "Real-world applications and use cases.",
        thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop",
        duration: "15:10",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 5,
        title: "Best Practices",
        description: "Learn industry-standard approaches.",
        thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
        duration: "10:55",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 6,
        title: "Advanced Techniques",
        description: "Master complex strategies and patterns.",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=225&fit=crop",
        duration: "20:30",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 7,
        title: "Project Setup",
        description: "Setting up your development environment.",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
        duration: "14:15",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 8,
        title: "Building Your First Project",
        description: "Hands-on project implementation.",
        thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=225&fit=crop",
        duration: "25:40",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 9,
        title: "Testing and Debugging",
        description: "Ensure your code works flawlessly.",
        thumbnail: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=400&h=225&fit=crop",
        duration: "16:25",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: 10,
        title: "Final Project & Certification",
        description: "Complete your capstone project.",
        thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=225&fit=crop",
        duration: "30:00",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ];
    localStorage.setItem("courseVideos", JSON.stringify(sampleVideos));
  }
};

export const Dashboard = ({ username, course, onLogout }: DashboardProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    initializeVideos();
    const storedVideos = localStorage.getItem("courseVideos");
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
  }, []);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    toast.success(`Now playing: ${video.title}`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="glass-effect border-b sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LearnHub</h1>
              <p className="text-sm text-muted-foreground">{course}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Welcome, {username}</p>
              <p className="text-xs text-muted-foreground">{videos.length} videos available</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Video Player */}
        {selectedVideo && (
          <Card className="mb-8 shadow-hover border-primary/20 animate-fade-in">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
                <iframe
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <p className="text-muted-foreground">{selectedVideo.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Duration: {selectedVideo.duration}</span>
                  <span>•</span>
                  <span>Video {selectedVideo.id} of {videos.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Video Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <Card
                key={video.id}
                className="group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-hover border-border/50 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
