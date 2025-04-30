import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        Welcome to VulnStore!
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl">
        Your one-stop shop for the latest and greatest tech gadgets. Explore our wide selection of products.
      </p>

      {/* Removed the warning Alert */}

      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
         <Button variant="outline" asChild>
            <Link href="/feedback">Give Feedback</Link>
        </Button>
      </div>

      <div className="pt-8 text-center text-muted-foreground">
        <p className="text-sm">Ready to start exploring? Click on "Browse Products" to see our collection.</p>
      </div>
    </div>
  );
}
