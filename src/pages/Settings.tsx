import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, Bell, BookOpen, Save, Loader2, Clock, 
  Target, Calendar, ExternalLink, CheckCircle2,
  GraduationCap, Sparkles
} from "lucide-react";
import { classLevels, streams, getSubjectsForLevel } from "@/lib/planner-data";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  class_level: string | null;
  stream: string | null;
}

interface StudyPreferences {
  dailyStudyHours: number;
  preferredStartTime: string;
  breakDuration: number;
  weekendStudy: boolean;
}

interface NotificationPreferences {
  streakReminders: boolean;
  studyReminders: boolean;
  dailyTips: boolean;
  achievements: boolean;
  emailNotifications: boolean;
}

const DEFAULT_STUDY_PREFS: StudyPreferences = {
  dailyStudyHours: 4,
  preferredStartTime: "09:00",
  breakDuration: 15,
  weekendStudy: true,
};

const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  streakReminders: true,
  studyReminders: true,
  dailyTips: true,
  achievements: true,
  emailNotifications: false,
};

export default function Settings() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [stream, setStream] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Study preferences
  const [studyPrefs, setStudyPrefs] = useState<StudyPreferences>(DEFAULT_STUDY_PREFS);

  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFS);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      loadPreferences();
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

  const loadPreferences = () => {
    // Load study preferences
    const storedStudyPrefs = localStorage.getItem("studyPreferences");
    if (storedStudyPrefs) {
      setStudyPrefs(JSON.parse(storedStudyPrefs));
    }

    // Load notification preferences
    const storedNotifPrefs = localStorage.getItem("notificationPrefs");
    if (storedNotifPrefs) {
      setNotificationPrefs(JSON.parse(storedNotifPrefs));
    }
  };

  const saveStudyPreferences = (prefs: StudyPreferences) => {
    localStorage.setItem("studyPreferences", JSON.stringify(prefs));
    setStudyPrefs(prefs);
    setHasUnsavedChanges(true);
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

      // Also save study preferences
      localStorage.setItem("studyPreferences", JSON.stringify(studyPrefs));
      
      setHasUnsavedChanges(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClassLevelChange = (value: string) => {
    setClassLevel(value);
    // Reset stream if class doesn't need it
    if (value !== "class-11" && value !== "class-12") {
      setStream("");
    }
    setHasUnsavedChanges(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const needsStream = classLevel === "class-11" || classLevel === "class-12";
  const selectedClassLabel = classLevels.find(c => c.value === classLevel)?.label;
  const selectedStreamLabel = streams.find(s => s.value === stream)?.label;
  const availableSubjects = classLevel ? getSubjectsForLevel(classLevel, stream) : [];

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your profile, study preferences, and notifications
            </p>
          </div>
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
              Unsaved changes
            </Badge>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="study" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Study</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule</span>
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
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Information
                </CardTitle>
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
                    <Input
                      id="avatar-url"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={avatarUrl}
                      onChange={(e) => {
                        setAvatarUrl(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                    />
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
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
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
                    Email is managed by your authentication provider
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
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Academic Settings
                </CardTitle>
                <CardDescription>
                  Set your class level and stream for personalized study plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Class Level */}
                <div className="space-y-2">
                  <Label htmlFor="class-level">Class / Grade Level</Label>
                  <Select value={classLevel} onValueChange={handleClassLevelChange}>
                    <SelectTrigger id="class-level">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">Primary & Middle School</div>
                      {classLevels.filter(c => c.category === "primary" || c.category === "middle").map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Separator className="my-1" />
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">Secondary School</div>
                      {classLevels.filter(c => c.category === "secondary").map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Separator className="my-1" />
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">Higher Secondary</div>
                      {classLevels.filter(c => c.category === "higher-secondary").map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Separator className="my-1" />
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">Competitive Exams</div>
                      {classLevels.filter(c => c.category === "competitive").map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                      <Separator className="my-1" />
                      <div className="px-2 py-1.5 text-xs text-muted-foreground font-semibold">College</div>
                      {classLevels.filter(c => c.category === "college").map((option) => (
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
                    <Select value={stream} onValueChange={(v) => { setStream(v); setHasUnsavedChanges(true); }}>
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

                {/* Selected Summary */}
                {classLevel && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Your Selection</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{selectedClassLabel}</Badge>
                      {selectedStreamLabel && (
                        <Badge variant="secondary">{selectedStreamLabel}</Badge>
                      )}
                    </div>
                    {availableSubjects.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-primary/10">
                        <p className="text-xs text-muted-foreground mb-2">Available Subjects:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {availableSubjects.slice(0, 8).map((subject) => (
                            <Badge 
                              key={subject.name} 
                              variant="outline" 
                              className="text-xs"
                              style={{ borderColor: subject.color + "50", color: subject.color }}
                            >
                              {subject.name}
                            </Badge>
                          ))}
                          {availableSubjects.length > 8 && (
                            <Badge variant="outline" className="text-xs">
                              +{availableSubjects.length - 8} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 sm:flex-none"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Preferences
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/planner">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Study Plan
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Schedule Preferences
                </CardTitle>
                <CardDescription>
                  Customize your daily study schedule and break times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Daily Study Hours */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Daily Study Hours</Label>
                    <Badge variant="secondary">{studyPrefs.dailyStudyHours} hours</Badge>
                  </div>
                  <Slider
                    value={[studyPrefs.dailyStudyHours]}
                    onValueChange={([value]) => saveStudyPreferences({ ...studyPrefs, dailyStudyHours: value })}
                    min={1}
                    max={12}
                    step={0.5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 4-6 hours for optimal learning
                  </p>
                </div>

                <Separator />

                {/* Preferred Start Time */}
                <div className="space-y-2">
                  <Label htmlFor="start-time">Preferred Start Time</Label>
                  <Select 
                    value={studyPrefs.preferredStartTime} 
                    onValueChange={(v) => saveStudyPreferences({ ...studyPrefs, preferredStartTime: v })}
                  >
                    <SelectTrigger id="start-time">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="05:00">5:00 AM (Early Morning)</SelectItem>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM (Afternoon)</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="18:00">6:00 PM (Evening)</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Break Duration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Break Duration</Label>
                    <Badge variant="secondary">{studyPrefs.breakDuration} min</Badge>
                  </div>
                  <Slider
                    value={[studyPrefs.breakDuration]}
                    onValueChange={([value]) => saveStudyPreferences({ ...studyPrefs, breakDuration: value })}
                    min={5}
                    max={30}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Short breaks between study sessions (5-15 min recommended)
                  </p>
                </div>

                <Separator />

                {/* Weekend Study */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Study on Weekends</Label>
                    <p className="text-sm text-muted-foreground">
                      Include Saturday and Sunday in your schedule
                    </p>
                  </div>
                  <Switch
                    checked={studyPrefs.weekendStudy}
                    onCheckedChange={(checked) => saveStudyPreferences({ ...studyPrefs, weekendStudy: checked })}
                  />
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
                  Save Schedule Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="streak-reminders" className="flex items-center gap-2">
                        🔥 Streak Reminders
                      </Label>
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

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="study-reminders" className="flex items-center gap-2">
                        ⏰ Study Reminders
                      </Label>
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

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-tips" className="flex items-center gap-2">
                        💡 Daily Tips
                      </Label>
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

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievements" className="flex items-center gap-2">
                        🎉 Achievements
                      </Label>
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

                <div className="p-4 rounded-xl bg-muted/50 border">
                  <p className="text-sm text-muted-foreground">
                    Notification preferences are saved automatically and will be applied to future alerts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors flex items-center gap-1">
              Privacy Policy <ExternalLink className="w-3 h-3" />
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors flex items-center gap-1">
              Terms of Service <ExternalLink className="w-3 h-3" />
            </Link>
            <a 
              href="https://task2top.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Visit Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
