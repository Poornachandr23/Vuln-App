"use client"; // Required for using hooks like useToast

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShieldAlert } from 'lucide-react'; // Corrected import
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Dummy product data - In a real vulnerable app, this might come from a database prone to SQLi
const products = [
  { id: 1, name: "Vulnerable Keyboard", price: 59.99, description: "Features unintended keystroke broadcasting.", imageUrl: "https://picsum.photos/seed/keyboard/400/300" },
  { id: 2, name: "Insecure Mouse", price: 25.50, description: "Clicks on ads automatically. Enhances browsing?", imageUrl: "https://picsum.photos/seed/mouse/400/300" },
  { id: 3, name: "Leaky USB Drive", price: 15.00, description: "Stores data... sometimes shares it.", imageUrl: "https://picsum.photos/seed/usb/400/300" },
  { id: 4, name: "Backdoor Webcam", price: 75.00, description: "High resolution, low privacy.", imageUrl: "https://picsum.photos/seed/webcam/400/300" },
  { id: 5, name: "Exploitable E-Reader", price: 120.00, description: "Root access available via footnote injection.", imageUrl: "https://picsum.photos/seed/ereader/400/300" },
  { id: 6, name: "Phishy Smartwatch", price: 199.99, description: "Tells time and asks for your bank details.", imageUrl: "https://picsum.photos/seed/smartwatch/400/300" },
  { id: 7, name: "Malleable Monitor", price: 250.00, description: "Display can be altered remotely. Prank ready!", imageUrl: "https://picsum.photos/seed/monitor/400/300" },
  { id: 8, name: "Chatty Router", price: 89.90, description: "Logs everything and shares with the world.", imageUrl: "https://picsum.photos/seed/router/400/300" },
  { id: 9, name: "Buggy Bluetooth Speaker", price: 45.00, description: "Pairs with any device in range, wanted or not.", imageUrl: "https://picsum.photos/seed/speaker/400/300" },
  { id: 10, name: "Trojan Tablet", price: 350.00, description: "Comes pre-loaded with 'special' diagnostic tools.", imageUrl: "https://picsum.photos/seed/tablet/400/300" },
  { id: 11, name: "Rickety Raspberry Pi Case", price: 9.99, description: "Offers zero physical security. Looks cool though.", imageUrl: "https://picsum.photos/seed/pi_case/400/300" },
  { id: 12, name: "SSRF-Enabled Smart Bulb", price: 19.99, description: "Can fetch data from internal network IPs.", imageUrl: "https://picsum.photos/seed/bulb/400/300" },
  { id: 13, name: "Default Credential Drone", price: 499.00, description: "Admin password is 'admin'. Easy setup!", imageUrl: "https://picsum.photos/seed/drone/400/300" },
  { id: 14, name: "Permissive Printer", price: 150.00, description: "Accepts print jobs from anyone, anywhere.", imageUrl: "https://picsum.photos/seed/printer/400/300" },
  { id: 15, name: "Open-Port Power Strip", price: 35.00, description: "Control outlets remotely! Telnet enabled.", imageUrl: "https://picsum.photos/seed/powerstrip/400/300" },
  { id: 16, name: "XSS-Ready Photo Frame", price: 65.00, description: "Display photos or arbitrary JavaScript.", imageUrl: "https://picsum.photos/seed/frame/400/300" },
];

export default function ProductsPage() {
  const { toast } = useToast(); // Initialize toast

  // Simulate adding item to cart and show toast
  const handleAddToCart = (productName: string) => {
    // In a real app, this would involve state management and potentially API calls.
    // Here, we just show a notification.
    console.log(`Simulating adding ${productName} to cart.`);
    toast({
      title: "Item Added (Simulated)",
      description: `${productName} has been added to your cart.`,
      duration: 3000, // Show toast for 3 seconds
    });
    // Potential CSRF vulnerability: This action should require a CSRF token if it modified server state.
    // Potential Logic Flaw: Could quantity be manipulated before this is called?
  };


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
          <ShieldAlert className="h-4 w-4 mr-2" />
          Vulnerability Hint: Imagine a search bar here. Searching for <code>&lt;script&gt;alert('Reflected XSS')&lt;/script&gt;</code> could execute the script if the input isn't sanitized. Product listings might be vulnerable to SQL Injection if dynamically fetched using URL parameters like <code>?category=Gifts'--</code> or <code>?id=1 OR 1=1</code>.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-48"> {/* Increased image height */}
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
              </div>
            </CardHeader>
             <CardContent className="p-4 flex-grow">
               <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
              <CardDescription className="text-xs h-10 overflow-hidden text-ellipsis">{product.description}</CardDescription> {/* Limited height */}
               <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {/* The 'add-to-cart' functionality would be a target for CSRF or logic flaws */}
              <Button className="w-full" onClick={() => handleAddToCart(product.name)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       {/* Information Disclosure Hint */}
       <div className="mt-8 p-4 border border-amber-500 rounded-md bg-amber-500/10">
        <p className="text-sm text-amber-700 font-medium flex items-center">
          <ShieldAlert className="h-4 w-4 mr-2 text-amber-600" />
          Vulnerability Hint (Info Disclosure): Check browser developer tools (Network tab, Console, Source code). Sometimes sensitive information like API keys, internal paths, or user data might be unintentionally exposed in comments, JavaScript variables, or API responses. Directory listing might be enabled on the server (try accessing <code>/images/</code> or <code>/uploads/</code> directly if hosted).
        </p>
      </div>
    </div>
  );
}
