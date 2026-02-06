import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Bell, BookOpen, Save, Camera, Loader2 } from "lucide-react";
import { classLevels, streams } from "@/lib/planner-data";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  class_level: string | null;
  stream: string | null;
}

interface NotificationPreferences {
  streakReminders: boolean;
  studyReminders: boolean;
  dailyTips: boolean;
  achievements: boolean;
}

export default function Settings() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [stream, setStream] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Notification preferences (stored in localStorage for now)
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    streakReminders: true,
    studyReminders: true,
    dailyTips: true,
    achievements: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      loadNotificationPreferences();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setClassLevel(data.class_level || "");
        setStream(data.stream || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadNotificationPreferences = () => {
    const stored = localStorage.getItem("notificationPrefs");
    if (stored) {
      setNotificationPrefs(JSON.parse(stored));
    }
  };

  const saveNotificationPreferences = (prefs: NotificationPreferences) => {
    localStorage.setItem("notificationPrefs", JSON.stringify(prefs));
    setNotificationPrefs(prefs);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName || null,
          class_level: classLevel || null,
          stream: stream || null,
          avatar_url: avatarUrl || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUrlChange = (url: string) => {
    setAvatarUrl(url);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const needsStream = classLevel === "class_11" || classLevel === "class_12";

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and study preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Study</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and avatar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={avatarUrl} alt={fullName || "User"} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {fullName ? getInitials(fullName) : user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="avatar-url">Avatar URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="avatar-url"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={avatarUrl}
                        onChange={(e) => handleAvatarUrlChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to an image for your avatar
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Preferences Tab */}
          <TabsContent value="study">
            <Card>
              <CardHeader>
                <CardTitle>Study Preferences</CardTitle>
                <CardDescription>
                  Set your class level and stream for personalized study plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Class Level */}
                <div className="space-y-2">
                  <Label htmlFor="class-level">Class Level</Label>
                  <Select value={classLevel} onValueChange={setClassLevel}>
                    <SelectTrigger id="class-level">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classLevels.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stream (only for Class 11 & 12) */}
                {needsStream && (
                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream</Label>
                    <Select value={stream} onValueChange={setStream}>
                      <SelectTrigger id="stream">
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {streams.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="streak-reminders">Streak Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded to maintain your study streak
                      </p>
                    </div>
                    <Switch
                      id="streak-reminders"
                      checked={notificationPrefs.streakReminders}
                      onCheckedChange={(checked) =>
                        saveNotificationPreferences({
                          ...notificationPrefs,
                          streakReminders: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="study-reminders">Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications for scheduled study sessions
                      </p>
                    </div>
                    <Switch
                      id="study-reminders"
                      checked={notificationPrefs.studyReminders}
                      onCheckedChange={(checked) =>
                        saveNotificationPreferences({
                          ...notificationPrefs,
                          studyReminders: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-tips">Daily Tips</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive helpful study tips and advice
                      </p>
                    </div>
                    <Switch
                      id="daily-tips"
                      checked={notificationPrefs.dailyTips}
                      onCheckedChange={(checked) =>
                        saveNotificationPreferences({
                          ...notificationPrefs,
                          dailyTips: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievements">Achievements</Label>
                      <p className="text-sm text-muted-foreground">
                        Celebrate your study milestones
                      </p>
                    </div>
                    <Switch
                      id="achievements"
                      checked={notificationPrefs.achievements}
                      onCheckedChange={(checked) =>
                        saveNotificationPreferences({
                          ...notificationPrefs,
                          achievements: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
