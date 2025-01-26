/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { 
  User, Lock, Bell, Mail, BookOpen, Clock, 
  GraduationCap, Globe, Save, Trash2, LogOut 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MenteeSettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Carter',
    email: 'john@mentee.com',
    bio: 'Aspiring frontend developer',
    currentRole: 'Junior Developer',
    education: 'Computer Science Student',
    timezone: 'America/New_York'
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    assignmentDeadlines: true,
    resourceUpdates: false,
    progressReports: true
  });

  const [preferences, setPreferences] = useState({
    communicationMethod: 'email',
    weeklyGoals: 15,
    preferredSessionTime: 'morning'
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle security update
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1">
          <Button
            variant={activeSection === 'profile' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('profile')}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            variant={activeSection === 'security' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('security')}
          >
            <Lock className="h-4 w-4 mr-2" />
            Security
          </Button>
          <Button
            variant={activeSection === 'notifications' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('notifications')}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button
            variant={activeSection === 'preferences' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveSection('preferences')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/api/placeholder-avatar.jpg" />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={profileData.email}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Role</label>
                      <Input
                        value={profileData.currentRole}
                        onChange={(e) => setProfileData({ ...profileData, currentRole: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Education</label>
                      <Input
                        value={profileData.education}
                        onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      placeholder="Describe your learning goals and interests"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input
                        type="password"
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input
                        type="password"
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Update Security
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Session Reminders</h4>
                      <p className="text-sm text-gray-600">
                        Get notified before upcoming sessions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sessionReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, sessionReminders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Assignment Deadlines</h4>
                      <p className="text-sm text-gray-600">
                        Receive reminders for pending assignments
                      </p>
                    </div>
                    <Switch
                      checked={notifications.assignmentDeadlines}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, assignmentDeadlines: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">New Resources</h4>
                      <p className="text-sm text-gray-600">
                        Notify when new learning materials are available
                      </p>
                    </div>
                    <Switch
                      checked={notifications.resourceUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, resourceUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Learning Style</label>
                    <Select
                      value={preferences.communicationMethod}
                      onValueChange={(value) => setPreferences({ ...preferences, communicationMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visual">Visual</SelectItem>
                        <SelectItem value="auditory">Auditory</SelectItem>
                        <SelectItem value="kinesthetic">Hands-on</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weekly Goal (hours)</label>
                    <Input
                      type="number"
                      value={preferences.weeklyGoals}
                      onChange={(e) => setPreferences({ ...preferences, weeklyGoals: Number(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Session Time</label>
                    <Select
                      value={preferences.preferredSessionTime}
                      onValueChange={(value) => setPreferences({ ...preferences, preferredSessionTime: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="mt-8 border-red-100 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-red-600">
                Permanently delete your account and all learning data
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}