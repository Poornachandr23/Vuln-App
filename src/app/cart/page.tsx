import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from 'lucide-react'; // Removed ShieldAlert

// Dummy cart data with generic names
const cartItems = [
  { id: 1, name: "Mechanical Keyboard", price: 59.99, quantity: 1, imageUrl: "https://picsum.photos/seed/keyboard/100/100" },
  { id: 4, name: "HD Webcam", price: 75.00, quantity: 2, imageUrl: "https://picsum.photos/seed/webcam/100/100" },
  { id: 7, name: "UltraWide Monitor", price: 250.00, quantity: 1, imageUrl: "https://picsum.photos/seed/monitor/100/100"},
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const tax = subtotal * 0.08; // Example tax
const total = subtotal + tax;

export default function CartPage() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4 overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded mr-4 object-cover flex-shrink-0"/>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm mr-2 shrink-0">Qty:</label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1" // Set min to 1 for standard behavior
                      defaultValue={item.quantity}
                      className="w-16 h-8 mr-4"
                      aria-label={`Quantity for ${item.name}`}
                      data-item-id={item.id}
                      data-unit-price={item.price}
                    />
                    {/* Removed quantity tampering hint */}
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 ml-auto shrink-0">
                      <Trash2 className="h-4 w-4"/>
                      <span className="sr-only">Remove {item.name}</span>
                    </Button>
                  </div>
                </div>
                <p className="font-semibold ml-4 shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
              </Card>
            ))
          )}
           {/* Removed client-side calculation warning */}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span id="cart-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span id="cart-tax">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span id="cart-total" data-total-value={total}>${total.toFixed(2)}</span>
              </div>
               {/* Removed price tampering hint */}
              <Separator />
              <div className="space-y-2 pt-4">
                 <label htmlFor="coupon-code" className="text-sm font-medium">Coupon Code</label>
                 <div className="flex space-x-2">
                    <Input id="coupon-code" placeholder="Enter coupon" />
                    <Button variant="secondary">Apply</Button>
                 </div>
                 {/* Removed coupon abuse hint */}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Proceed to Checkout</Button>
               {/* Removed checkout vulnerability hint */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
