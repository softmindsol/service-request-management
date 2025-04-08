import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from './Header';

const requestTypes = [
  {
    id: 'drinks',
    label: 'Drinks',
    items: ['Tea', 'Coffee', 'Orange Juice']
  },
  {
    id: 'food',
    label: 'Food',
    items: ['Burger', 'Pizza', 'Sandwich']
  },
  {
    id: 'reception',
    label: 'Reception Call',
    items: ['Front Desk Help']
  },
];

export default function UserPage() {
  const [selectedRequest, setSelectedRequest] = useState('');
  const [notes, setNotes] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('John Smith');
  const [submitted, setSubmitted] = useState(false);
  const [serviceName] = useState("IntraServe Desk");

  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<{ [key: string]: { name: string; quantity: number } }>({});

  const handleQuantityChange = (item: string, quantity: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [item]: quantity
    }));
  };

  const handleAddToCart = (item: string, quantity: number) => {
    if (quantity > 0) {
      setCart(prev => ({
        ...prev,
        [item]: { name: item, quantity }
      }));
    }
  };

  const submitRequest = () => {
    const selectedItems = Object.entries(cart)
      .map(([item, { quantity }]) => `${quantity} x ${item}`)
      .join(', ');

    if (!selectedItems) return; // If the cart is empty, we don't proceed

    const confirmMore = window.confirm("Would you like to add more items or send the order?");
    if (!confirmMore) {
      // Instead of alert, we show the submitted items for now
      console.log("Submitted Order:", selectedItems, "Notes:", notes); // Replace with API call
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedRequest('');
        setItemQuantities({});
        setCart({});
        setNotes('');
      }, 3000);
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <Header
        theme={theme}
        serviceName={serviceName}
        setTheme={setTheme}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Selection */}
          <div className="md:w-1/3 space-y-4">
            {requestTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedRequest === type.id ? "default" : "outline"}
                className={`w-full border ${selectedRequest !== type.id
                    ? theme === 'dark'
                      ? 'border-white text-black hover:bg-white hover:text-black'
                      : 'border-black text-black hover:bg-black hover:text-white'
                    : ''
                  }`}
                onClick={() => setSelectedRequest(type.id)}
              >
                {type.label}
              </Button>

            ))}
          </div>

          {/* Request Form */}
          <div className="flex-1 space-y-4">
            <Card>
              <CardContent className="space-y-4 p-4 md:p-6">
                <h2 className="text-xl font-semibold">Submit a Request</h2>

                {/* Sub-items with quantity */}
                {selectedRequest && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Items & Quantity</h3>
                    <div className="space-y-2">
                      {requestTypes.find(r => r.id === selectedRequest)?.items.map(item => (
                        <div key={item} className="flex items-center justify-between gap-4 py-1">
                          <span className="w-1/3">{item}</span>

                          <input
                            type="number"
                            min={0}
                            value={itemQuantities[item] || 0}
                            onChange={(e) => handleQuantityChange(item, Number(e.target.value))}
                            className="w-20 p-2 border rounded text-black"
                          />

                          <Button
                            className="ml-4"
                            onClick={() => handleAddToCart(item, itemQuantities[item] || 0)}
                            disabled={itemQuantities[item] === 0}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      ))}

                    </div>
                  </div>
                )}

                {/* Cart Preview */}
                {Object.keys(cart).length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Cart</h3>
                    <div className="space-y-2">
                      {Object.entries(cart).map(([key, { name, quantity }]) => (
                        <div key={key} className="flex justify-between">
                          <span>{name}</span>
                          <span>{quantity} x</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Textarea
                  placeholder="Optional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button onClick={submitRequest} disabled={Object.keys(cart).length === 0}> Submit Request </Button>
                {submitted && <div className="text-green-500">Request submitted!</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md bg-white text-black dark:bg-gray-800 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">User Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Profile Image</label>
                <input type="file" accept="image/*" className="w-full" />
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input type="password" className="w-full p-2 border rounded" />
              </div>
              <Button onClick={() => setShowSettings(false)}>Save & Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
