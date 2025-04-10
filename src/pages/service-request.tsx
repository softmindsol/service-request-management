// ✅ Final Updated Code

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/common/Header";
import { addOrder } from "@/store/slices/orderSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function UserPage() {
  const [selectedRequest, setSelectedRequest] = useState('');
  const [notes, setNotes] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState('John Smith');
  const [submitted, setSubmitted] = useState(false);
  const [serviceName] = useState("IntraServe Desk");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<{ [key: string]: { name: string; quantity: number } }>({});
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const submitRequest = () => {
    if (Object.keys(cart).length === 0) return;
    setShowConfirmModal(true);
  };

  const confirmSendOrder = () => {
    const orderItems = Object.entries(cart).map(([name, { quantity }]) => ({ name, quantity }));
    dispatch(addOrder({
      type: selectedRequest,
      person: userName,
      items: orderItems,
      status: 'Pending',
    }));

    setSubmitted(true);
    setShowConfirmModal(false);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedRequest('');
      setItemQuantities({});
      setCart({});
      setNotes('');
    }, 200);
  };

  const handleQuantityChange = (item: string, quantity: number) => {
    setItemQuantities(prev => ({ ...prev, [item]: quantity }));
  };

  const handleAddToCart = (item: string, quantity: number) => {
    if (quantity > 0) {
      setCart(prev => ({ ...prev, [item]: { name: item, quantity } }));
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Header
        theme={theme}
        serviceName={serviceName}
        setTheme={setTheme}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-4">
            {categories.map((type) => (
              <Button
                key={type.id}
                variant={selectedRequest === type.id ? "default" : "outline"}
                className={`w-full border hover:cursor-pointer ${selectedRequest !== type.id
                  ? theme === 'dark'
                    ? 'border-white text-black hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                  : ''}`}
                onClick={() => setSelectedRequest(type.id)}
              >
                {type.label}
              </Button>
            ))}
          </div>

          <div className="flex-1 space-y-4">
            {!selectedRequest && (
              <Card className="text-center p-6 text-gray-500 dark:text-gray-400">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-2">Welcome to IntraServe Desk</h2>
                  <p className="text-sm">Please select a category to begin your request.</p>
                </CardContent>
              </Card>
            )}

            {selectedRequest && (
              <Card>
                <CardContent className="space-y-4 p-4 md:px-6 md:py-2">
                  <h2 className="text-xl font-semibold">Submit a Request</h2>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Items & Quantity</h3>
                    <div className="space-y-2">
                      {categories.find(r => r.id === selectedRequest)?.items.map(item => {
                        const quantity = itemQuantities[item.name] || 1;
                        return (
                          <Card key={item.name} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="text-lg font-medium w-[15%]">{item.name}</div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" onClick={() => handleQuantityChange(item.name, Math.max(1, quantity - 1))}>–</Button>
                              <span className="min-w-[24px] text-center">{quantity}</span>
                              <Button variant="outline" onClick={() => handleQuantityChange(item.name, quantity + 1)}>+</Button>
                            </div>
                            <Button onClick={() => handleAddToCart(item.name, quantity)}>Add to Cart</Button>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Optional notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />

                  {Object.keys(cart).length > 0 && (
                    <>
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
                      <Button onClick={submitRequest}>Submit Request</Button>
                    </>
                  )}

                  {submitted && <div className="text-green-500">Request submitted!</div>}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="relative p-6 w-full max-w-md bg-white text-black dark:bg-gray-800 dark:text-white">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-black dark:text-white text-[24px] hover:scale-110 transition cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 mt-2">User Settings</h2>
            <div className="space-y-4">
              <input type="file" accept="image/*" className="w-full text-sm" />
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-2 border rounded" />
              <input type="password" className="w-full p-2 border rounded" placeholder="Password" />
              <Button onClick={() => setShowSettings(false)}>Save</Button>
            </div>
          </Card>
        </div>
      )}

      {/* ✅ Single confirmation modal retained */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white text-black dark:bg-zinc-900 dark:text-white rounded-xl shadow-lg">
            <CardContent className=" space-y-6">
              <h2 className="text-xl font-semibold">Confirm Your Order</h2>
              <p>Would you like to send the order now or add more items?</p>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowConfirmModal(false)}>Add More Items</Button>
                <Button className="bg-black text-white dark:bg-white dark:text-black" onClick={confirmSendOrder}>Send Order</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
