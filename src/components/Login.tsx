import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";

interface LoginProps {
  onLogin: (username: string, course: string) => void;
}

const courses = [
  "Web Development Fundamentals",
  "Advanced JavaScript",
  "React Masterclass",
  "Full Stack Development",
  "UI/UX Design Principles",
];

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "sivagowra" && password === "Welcome@123") {
      if (!course) {
        toast.error("Please select a course");
        return;
      }
      toast.success("Login successful!");
      onLogin(username, course);
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );
      const userInfo = await userInfoResponse.json();
      
      // Extract username from email (part before @)
      const googleUsername = userInfo.email?.split("@")[0] || userInfo.name || "Google User";
      
      // Show course selection for Google users
      setShowCourseSelection(true);
      setUsername(googleUsername);
      
      // Auto-select first course for Google login (or you can show course selection)
      // For now, we'll require course selection
      toast.success(`Welcome, ${userInfo.name || googleUsername}! Please select a course.`);
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to get user information from Google");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google sign-in failed. Please try again.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  const handleGoogleLoginClick = () => {
    googleLogin();
  };

  const handleCourseSelectForGoogle = () => {
    if (!course) {
      toast.error("Please select a course");
      return;
    }
    toast.success("Login successful!");
    onLogin(username, course);
    setShowCourseSelection(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      
      <Card className="w-full max-w-md relative z-10 glass-effect shadow-hover border-white/20 animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 shadow-card">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to LearnHub
          </CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access your courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="transition-all focus:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all focus:scale-[1.02]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={course} onValueChange={setCourse} required>
                <SelectTrigger id="course" className="transition-all focus:scale-[1.02]">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((courseName) => (
                    <SelectItem key={courseName} value={courseName}>
                      {courseName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className="w-full gradient-primary hover:shadow-hover transition-all hover:scale-[1.02] text-white font-semibold"
              size="lg"
            >
              Login to Dashboard
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          {!showCourseSelection ? (
            <Button
              type="button"
              onClick={handleGoogleLoginClick}
              variant="outline"
              className="w-full hover:bg-accent transition-all hover:scale-[1.02]"
              size="lg"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-course">Select Course</Label>
                <Select value={course} onValueChange={setCourse} required>
                  <SelectTrigger id="google-course" className="transition-all focus:scale-[1.02]">
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((courseName) => (
                      <SelectItem key={courseName} value={courseName}>
                        {courseName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                onClick={handleCourseSelectForGoogle}
                className="w-full gradient-primary hover:shadow-hover transition-all hover:scale-[1.02] text-white font-semibold"
                size="lg"
              >
                Continue to Dashboard
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowCourseSelection(false);
                  setCourse("");
                  setUsername("");
                }}
                variant="ghost"
                className="w-full"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
