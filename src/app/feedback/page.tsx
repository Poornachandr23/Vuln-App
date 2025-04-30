"use client"; // Required for form handling

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Corrected import
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function FeedbackPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Vulnerable submit handler simulation
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate CSRF vulnerability: No CSRF token check
    // Simulate Stored XSS: Directly displaying user input without sanitization
    // Simulate potential Command Injection/SQLi if processed insecurely backend (not shown here)

    // In a real app, this would POST to a backend endpoint.
    // We simulate the effect of Stored XSS by displaying the message directly.
    console.log("Simulating submission:", { name, email, message });

    // Display the submitted message with potential XSS
    setSubmittedMessage(message);

    toast({
      title: "Feedback Submitted (Simulated)",
      description: "Thank you for your feedback! (Check below for reflected input)",
    });

    // Clear form (optional)
    // setName('');
    // setEmail('');
    // setMessage('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Feedback Form</h1>
       <Alert variant="destructive" className="mb-6">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Vulnerability Zone!</AlertTitle>
        <AlertDescription>
          This form is designed to be vulnerable. Try submitting HTML or JavaScript code (e.g., <code>&lt;img src=x onerror=alert('XSS')&gt;</code> or <code>&lt;b&gt;Bold&lt;/b&gt;</code>) in the message field to see Stored/Reflected XSS. The submission process also lacks CSRF protection.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Feedback</CardTitle>
          <CardDescription>Let us know what you think (carefully!).</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              {/* Textarea vulnerable to Stored/Reflected XSS */}
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here... try some HTML/JS!"
                rows={5}
              />
               <p className="text-xs text-destructive flex items-center mt-1">
                 <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Inject HTML/JS here.
               </p>
            </div>
          </CardContent>
          <CardFooter>
            {/* CSRF target */}
            <Button type="submit">Submit Feedback</Button>
          </CardFooter>
        </form>
      </Card>

      {submittedMessage && (
        <Card className="mt-8">
           <CardHeader>
             <CardTitle className="text-destructive">Submitted Message (Raw - Potential XSS)</CardTitle>
           </CardHeader>
           <CardContent>
              {/* THIS IS THE VULNERABLE PART - Directly rendering user input */}
              <div dangerouslySetInnerHTML={{ __html: submittedMessage }} />
              {/* End vulnerable part */}
              <p className="text-xs text-muted-foreground mt-4">(The content above is rendered directly from your input, demonstrating Stored/Reflected XSS if malicious code was entered.)</p>
           </CardContent>
        </Card>
      )}
    </div>
  );
}
