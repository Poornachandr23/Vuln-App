import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Removed ShieldAlert, User, Lock imports

export default function AccountPage() {

  // Simulate logged-in user data (would normally come from session/auth state)
  const user = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
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
              <Input id="username" defaultValue={user.username} />
              {/* Removed XSS hint */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={user.email} readOnly />
               {/* Removed email verification hint */}
            </div>
             <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input id="userId" value={user.id} readOnly className="bg-muted"/>
               {/* Removed IDOR hint */}
            </div>
            <Button>Update Profile</Button> {/* Removed CSRF comment */}
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
              <Input id="current-password" type="password" /> {/* Removed Brute Force hint */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
               {/* Removed CSRF/validation hint */}
            </div>
            <Button>Change Password</Button> {/* Removed CSRF comment */}
            <Button variant="link" className="text-sm text-accent mt-2">Forgot Password?</Button>
             {/* Removed insecure password reset hint */}
          </CardContent>
        </Card>
      </div>
       <div className="mt-8">
        <Button variant="destructive">Log Out</Button>
         {/* Removed session invalidation hint */}
      </div>
    </div>
  );
}
