import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

// Dummy product data - In a real vulnerable app, this might come from a database prone to SQLi
const products = [
  { id: 1, name: "Vulnerable Keyboard", price: 59.99, description: "Types whatever it wants sometimes.", imageUrl: "https://picsum.photos/seed/keyboard/400/300" },
  { id: 2, name: "Insecure Mouse", price: 25.50, description: "Clicks on random links. Exciting!", imageUrl: "https://picsum.photos/seed/mouse/400/300" },
  { id: 3, name: "Leaky USB Drive", price: 15.00, description: "Stores data... temporarily.", imageUrl: "https://picsum.photos/seed/usb/400/300" },
  { id: 4, name: "Backdoor Webcam", price: 75.00, description: "Someone might be watching.", imageUrl: "https://picsum.photos/seed/webcam/400/300" },
  { id: 5, name: "Exploitable E-Reader", price: 120.00, description: "Great for reading... system files?", imageUrl: "https://picsum.photos/seed/ereader/400/300" },
  { id: 6, name: "Phishy Smartwatch", price: 199.99, description: "Tells time and steals credentials.", imageUrl: "https://picsum.photos/seed/smartwatch/400/300" },
];

export default function ProductsPage() {
  // Simulate potential IDOR vulnerability - In a real PHP app, this might be a direct GET parameter
  // For now, we just display all products.
  // Example IDOR link: /products?category_id=1' UNION SELECT user, password FROM users--
  // Example XSS link: /products?search=<script>alert('XSS')</script>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      {/* Potential Search XSS vulnerability area */}
      <div className="mb-6 p-4 border border-destructive rounded-md bg-destructive/10">
        <p className="text-sm text-destructive font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Vulnerability Hint: Try searching for <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> in a real search bar (not implemented here). Product listings might be susceptible to SQL Injection if fetched dynamically based on URL parameters like <code>?category=...</code> or <code>?id=...</code>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              {/* The 'add-to-cart' functionality would be a target for CSRF or logic flaws */}
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
