import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShieldAlert } from 'lucide-react';

// Dummy cart data
const cartItems = [
  { id: 1, name: "Vulnerable Keyboard", price: 59.99, quantity: 1, imageUrl: "https://picsum.photos/seed/keyboard/100/100" },
  { id: 4, name: "Backdoor Webcam", price: 75.00, quantity: 2, imageUrl: "https://picsum.photos/seed/webcam/100/100" },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const tax = subtotal * 0.08; // Example tax
const total = subtotal + tax;

export default function CartPage() {
  // Potential Vulnerabilities:
  // - Payment Tampering: Modifying quantity/price before checkout.
  // - Coupon Abuse: Applying invalid or reused coupons.
  // - CSRF: Forcing user to add/remove items or checkout.
  // - Race Conditions: During checkout or coupon application.

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded mr-4 object-cover"/>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm mr-2">Qty:</label>
                    {/* Input vulnerable to tampering */}
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      defaultValue={item.quantity}
                      className="w-16 h-8 mr-4"
                      aria-label={`Quantity for ${item.name}`}
                      data-item-id={item.id} // Potential DOM manipulation target
                    />
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4"/>
                      <span className="sr-only">Remove {item.name}</span>
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </Card>
            ))
          )}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                {/* Price vulnerable to tampering */}
                <span id="cart-total" data-total-value={total}>${total.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="space-y-2 pt-4">
                 <label htmlFor="coupon-code" className="text-sm font-medium">Coupon Code</label>
                 {/* Input potentially vulnerable to Coupon Abuse or SQLi if processed server-side */}
                 <div className="flex space-x-2">
                    <Input id="coupon-code" placeholder="Enter coupon" />
                    <Button variant="secondary">Apply</Button>
                 </div>
                 <p className="text-xs text-destructive flex items-center mt-1">
                    <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Try negative quantities or prices, or manipulate total before checkout. Coupons might be reusable or predictable.
                 </p>
              </div>
            </CardContent>
            <CardFooter>
              {/* Checkout button - target for CSRF, Race Conditions, Logic Bypass */}
              <Button className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
