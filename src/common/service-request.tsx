import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FaCoffee, FaUtensils, FaBellSlash } from "react-icons/fa";


const services = [
  { id: "drinks", label: "Drinks", icon: <FaCoffee size={40} /> },
  { id: "food", label: "Food", icon: <FaUtensils size={40} /> },
  { id: "reception", label: "Reception Call", icon: <FaBellSlash size={40} /> },
];

export default function ServiceRequest() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isOffline = false; // For demo; in real-world this would use network detection

  const handleSubmit = () => {
    if (!selectedService) return;
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 sm:max-w-lg md:max-w-xl">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h1 className="text-2xl font-semibold">Service Request</h1>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            John Smith
            {isOffline && <span className="text-red-500">• Offline</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`flex flex-col items-center justify-center p-6 cursor-pointer border-2 transition-colors duration-200 ${selectedService === service.id
                  ? "border-black"
                  : "border-gray-200"
                }`}>
              {service.icon}
              <p className="mt-2 text-lg font-medium text-center">
                {service.label}
              </p>
            </Card>
          ))}
        </div>

        <div>
          <label className="text-sm font-medium">Optional Notes/Details:</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any specific request here..."
            className="mt-1 w-full"
          />
        </div>

        <Button
          disabled={!selectedService}
          onClick={handleSubmit}
          className="w-full">
          {isOffline ? "Queue Request Offline" : "Submit Request"}
        </Button>

        {submitted && (
          <div className="text-green-600 text-center font-medium mt-2">
            Request Sent!
          </div>
        )}
      </div>
    </div>
  );
}
