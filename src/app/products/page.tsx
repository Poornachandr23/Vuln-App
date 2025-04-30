"use client"; // Required for using hooks like useToast

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Updated product data with generic names/descriptions
const products = [
  { id: 1, name: "Mechanical Keyboard", price: 59.99, description: "RGB Backlit, Cherry MX Switches.", imageUrl: "https://picsum.photos/seed/keyboard/400/300" },
  { id: 2, name: "Wireless Mouse", price: 25.50, description: "Ergonomic design, long battery life.", imageUrl: "https://picsum.photos/seed/mouse/400/300" },
  { id: 3, name: "USB 3.0 Flash Drive", price: 15.00, description: "64GB storage, high-speed transfer.", imageUrl: "https://picsum.photos/seed/usb/400/300" },
  { id: 4, name: "HD Webcam", price: 75.00, description: "1080p resolution, built-in microphone.", imageUrl: "https://picsum.photos/seed/webcam/400/300" },
  { id: 5, name: "E-Reader Pro", price: 120.00, description: "Paperwhite display, 32GB storage.", imageUrl: "https://picsum.photos/seed/ereader/400/300" },
  { id: 6, name: "Smartwatch Series X", price: 199.99, description: "Fitness tracking, heart rate monitor.", imageUrl: "https://picsum.photos/seed/smartwatch/400/300" },
  { id: 7, name: "UltraWide Monitor", price: 250.00, description: "34-inch QHD display, 144Hz refresh rate.", imageUrl: "https://picsum.photos/seed/monitor/400/300" },
  { id: 8, name: "WiFi 6 Router", price: 89.90, description: "High-speed wireless connectivity for your home.", imageUrl: "https://picsum.photos/seed/router/400/300" },
  { id: 9, name: "Bluetooth Speaker", price: 45.00, description: "Portable, waterproof, rich sound.", imageUrl: "https://picsum.photos/seed/speaker/400/300" },
  { id: 10, name: "Android Tablet", price: 350.00, description: "10-inch display, great for media consumption.", imageUrl: "https://picsum.photos/seed/tablet/400/300" },
  { id: 11, name: "Raspberry Pi Case", price: 9.99, description: "Protective case with fan mount.", imageUrl: "https://picsum.photos/seed/pi_case/400/300" },
  { id: 12, name: "Smart LED Bulb", price: 19.99, description: "Color changing, works with Alexa/Google.", imageUrl: "https://picsum.photos/seed/bulb/400/300" },
  { id: 13, name: "Quadcopter Drone", price: 499.00, description: "4K camera, GPS, long flight time.", imageUrl: "https://picsum.photos/seed/drone/400/300" },
  { id: 14, name: "All-in-One Printer", price: 150.00, description: "Wireless printing, scanning, and copying.", imageUrl: "https://picsum.photos/seed/printer/400/300" },
  { id: 15, name: "Smart Power Strip", price: 35.00, description: "Control outlets individually via app.", imageUrl: "https://picsum.photos/seed/powerstrip/400/300" },
  { id: 16, name: "Digital Photo Frame", price: 65.00, description: "Display your favorite photos wirelessly.", imageUrl: "https://picsum.photos/seed/frame/400/300" },
];

export default function ProductsPage() {
  const { toast } = useToast(); // Initialize toast

  // Simulate adding item to cart and show toast
  const handleAddToCart = (productName: string) => {
    console.log(`Adding ${productName} to cart.`);
    toast({
      title: "Item Added",
      description: `${productName} has been added to your cart.`,
      duration: 3000, // Show toast for 3 seconds
    });
  };


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      {/* Removed Search XSS vulnerability hint area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
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
              <CardDescription className="text-xs h-10 overflow-hidden text-ellipsis">{product.description}</CardDescription>
               <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => handleAddToCart(product.name)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       {/* Removed Information Disclosure Hint */}
    </div>
  );
}
