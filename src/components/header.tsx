import Link from 'next/link';
import { ShoppingCart, User, MessageSquare } from 'lucide-react'; // Changed MessageSquareWarning to MessageSquare
import { Button } from '@/components/ui/button';
// Removed Badge import

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Using inline SVG for Lock/Security icon - keeping generic store icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary" // Changed color to primary
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span className="font-bold">VulnStore</span>
            {/* Removed Insecure Badge */}
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/products"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Products
          </Link>
          <Link
            href="/feedback"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
             <MessageSquare className="inline-block mr-1 h-4 w-4" /> {/* Removed text-destructive */}
             Feedback
          </Link>
           {/* Removed Vulnerabilities List Link */}
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">User Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
