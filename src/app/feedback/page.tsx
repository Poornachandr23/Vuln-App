"use client"; // Required for form handling

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
// Removed Alert imports and ShieldAlert


export default function FeedbackPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Submit handler simulation
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Simulating submission:", { name, email, message });

    // Display the submitted message (still potentially dangerous if not handled server-side)
    setSubmittedMessage(message);

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });

  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Feedback Form</h1>
       {/* Removed Vulnerability Zone Alert */}

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Feedback</CardTitle>
          <CardDescription>Let us know what you think.</CardDescription>
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
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
              />
               {/* Removed XSS hint */}
            </div>
          </CardContent>
          <CardFooter>
            {/* Removed CSRF target comment */}
            <Button type="submit">Submit Feedback</Button>
          </CardFooter>
        </form>
      </Card>

      {submittedMessage && (
        <Card className="mt-8">
           <CardHeader>
             <CardTitle>Your Submitted Message</CardTitle> {/* Changed title */}
           </CardHeader>
           <CardContent>
              {/* Still potentially vulnerable, but removing explicit warning */}
              <div dangerouslySetInnerHTML={{ __html: submittedMessage }} />
              {/* Removed explicit warning about rendering */}
           </CardContent>
        </Card>
      )}
    </div>
  );
}
