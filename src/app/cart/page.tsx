import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShieldAlert } from 'lucide-react';

// Dummy cart data
const cartItems = [
  { id: 1, name: "Vulnerable Keyboard", price: 59.99, quantity: 1, imageUrl: "https://picsum.photos/seed/keyboard/100/100" },
  { id: 4, name: "Backdoor Webcam", price: 75.00, quantity: 2, imageUrl: "https://picsum.photos/seed/webcam/100/100" },
  { id: 7, name: "Malleable Monitor", price: 250.00, quantity: 1, imageUrl: "https://picsum.photos/seed/monitor/100/100"},
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
              <Card key={item.id} className="flex items-center p-4 overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded mr-4 object-cover flex-shrink-0"/>
                <div className="flex-grow min-w-0"> {/* Added min-w-0 */}
                  <h3 className="font-semibold truncate">{item.name}</h3> {/* Added truncate */}
                  <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="text-sm mr-2 shrink-0">Qty:</label>
                    {/* Input vulnerable to tampering */}
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="0" // Allow 0 for removal, but could be exploited (negative values?)
                      defaultValue={item.quantity}
                      className="w-16 h-8 mr-4"
                      aria-label={`Quantity for ${item.name}`}
                      data-item-id={item.id} // Potential DOM manipulation target
                      data-unit-price={item.price} // Store price for client-side recalc (vulnerable)
                    />
                     <p className="text-xs text-destructive flex items-center mr-4 shrink-0">
                        <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Try setting quantity to 0, negative, or very large numbers. Check if price updates.
                     </p>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 ml-auto shrink-0">
                      <Trash2 className="h-4 w-4"/>
                      <span className="sr-only">Remove {item.name}</span>
                      {/* CSRF hint: Removing items should ideally be a POST request with a CSRF token */}
                    </Button>
                  </div>
                </div>
                <p className="font-semibold ml-4 shrink-0">${(item.price * item.quantity).toFixed(2)}</p> {/* Added shrink-0 */}
              </Card>
            ))
          )}
           {cartItems.length > 0 && (
             <div className="text-right text-sm text-muted-foreground">
                (Cart totals are calculated client-side for demonstration - this is insecure!)
             </div>
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
                {/* Price vulnerable to tampering if calculated/trusted client-side */}
                <span id="cart-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                {/* Price vulnerable to tampering */}
                <span id="cart-tax">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                {/* Price vulnerable to tampering - should be recalculated server-side */}
                <span id="cart-total" data-total-value={total}>${total.toFixed(2)}</span>
              </div>
               <p className="text-xs text-destructive flex items-center mt-1">
                 <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Can you modify the Subtotal or Total values in the browser's developer tools before checking out?
               </p>
              <Separator />
              <div className="space-y-2 pt-4">
                 <label htmlFor="coupon-code" className="text-sm font-medium">Coupon Code</label>
                 {/* Input potentially vulnerable to Coupon Abuse or SQLi if processed insecurely server-side */}
                 <div className="flex space-x-2">
                    <Input id="coupon-code" placeholder="Enter coupon" />
                    <Button variant="secondary">Apply</Button>
                 </div>
                 <p className="text-xs text-destructive flex items-center mt-1">
                    <ShieldAlert className="h-3 w-3 mr-1" /> Hint: Try coupons like 'FREE', 'TEST100', 'DISCOUNT50'. Are they validated server-side? Can they be applied multiple times? (Race Condition?).
                 </p>
              </div>
            </CardContent>
            <CardFooter>
              {/* Checkout button - target for CSRF, Race Conditions, Logic Bypass */}
              <Button className="w-full">Proceed to Checkout</Button>
               <p className="text-xs text-muted-foreground mt-2 text-center w-full">
                   (Checkout process might skip payment validation, or be vulnerable to race conditions if checking inventory/applying coupons).
               </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
