import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert, User, Lock } from 'lucide-react';

export default function AccountPage() {
  // Potential Vulnerabilities:
  // - Broken Authentication: Weak login, no rate limiting.
  // - Session Issues: Fixation, hijacking (if tokens handled insecurely).
  // - CSRF: Forcing password change or profile update.
  // - IDOR/BAC: Viewing/editing other users' profiles (e.g., /account?user_id=2).
  // - XSS: Stored XSS in profile fields (username, address).
  // - Sensitive Data Exposure: Leaking data in responses or JS.
  // - Insecure Password Reset.

  // Simulate logged-in user data (would normally come from session/auth state)
  const user = {
    id: 1, // Vulnerable to IDOR if used in URL/requests
    username: "testuser",
    email: "test@example.com",
    // Password should NEVER be stored or sent like this
    // password_hash: "$2y$10$..." (example)
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>View and update your profile details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              {/* Input vulnerable to Stored XSS */}
              <Input id="username" defaultValue={user.username} />
              <p className="text-xs text-destructive flex items-center mt-1">
                <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Try injecting <code>&lt;script&gt;alert('Stored XSS')&lt;/script&gt;</code> here. Other users viewing your (or a manipulated) profile might trigger it.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {/* Readonly, but update mechanism could be vulnerable */}
              <Input id="email" defaultValue={user.email} readOnly />
               <p className="text-xs text-muted-foreground flex items-center mt-1">
                 (Email change might require a vulnerable verification process)
              </p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              {/* Exposing internal IDs can lead to IDOR */}
              <Input id="userId" value={user.id} readOnly className="bg-muted"/>
               <p className="text-xs text-destructive flex items-center mt-1">
                 <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Try accessing <code>/account?user_id=2</code> (if implemented) to test for IDOR/Broken Access Control.
               </p>
            </div>
            {/* CSRF target */}
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              {/* Input vulnerable to Brute Force if no rate limiting */}
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
               <p className="text-xs text-destructive flex items-center mt-1">
                 <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Check if the password change form is protected against CSRF. Is there proper validation?
               </p>
            </div>
            {/* CSRF target */}
            <Button>Change Password</Button>
            <Button variant="link" className="text-sm text-accent mt-2">Forgot Password?</Button>
             <p className="text-xs text-muted-foreground mt-1">
                 (Password reset flow could be insecure - predictable tokens, HTTP links).
             </p>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8">
        <Button variant="destructive">Log Out</Button>
        <p className="text-xs text-muted-foreground mt-1">
           (Check if logout invalidates the session token properly on the server-side).
        </p>
      </div>
    </div>
  );
}
