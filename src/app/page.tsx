import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        Welcome to VulnStore!
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl">
        Your one-stop shop for... learning about web vulnerabilities! This site is designed
        to be intentionally insecure. Explore, learn, and test responsibly.
      </p>

      <Alert variant="destructive" className="max-w-2xl">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning!</AlertTitle>
        <AlertDescription>
          This application contains numerous security vulnerabilities by design.
          It is intended for educational purposes only. Do <span className="font-bold">NOT</span> use real credentials or sensitive information.
          Do <span className="font-bold">NOT</span> deploy this application in a production environment.
        </AlertDescription>
      </Alert>

      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/vulnerabilities">See Vulnerability List</Link>
        </Button>
      </div>

      <div className="pt-8 text-center text-muted-foreground">
        <p className="text-sm">Ready to start exploring? Click on "Browse Products" or check out the list of implemented vulnerabilities.</p>
      </div>
    </div>
  );
}
