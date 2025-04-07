// src/pages/AdminDashboard.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import { Sidebar } from "./Sidebar";

const requests = [
  {
    id: 1,
    service: "Drinks",
    status: "Pending",
    department: "Kitchen",
    timestamp: "10:35 AM",
    notes: "Need cold coffee",
  },
  {
    id: 2,
    service: "Reception Call",
    status: "In Progress",
    department: "Reception",
    timestamp: "11:10 AM",
    notes: "",
  },
];

const statusColor = {
  Pending: "bg-red-200 text-red-800",
  "In Progress": "bg-blue-200 text-blue-800",
  Completed: "bg-green-200 text-green-800",
};

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin User</span>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {/* Filter section */}
        <div className="flex flex-wrap gap-4 items-center">
          <Input placeholder="Search notes..." className="w-full sm:w-60" />
          <Select>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Request List */}
        <ScrollArea className="h-[60vh] pr-2">
          <div className="grid gap-4">
            {requests.map((req) => (
              <Card
                key={req.id}
                className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <div className="font-semibold">{req.service}</div>
                  <div className="text-sm text-gray-500">
                    {req.timestamp} • {req.department}
                  </div>
                  {req.notes && <div className="mt-1 text-sm">{req.notes}</div>}
                </div>
                <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
                  <Badge
                    className={`$ {
                      statusColor[req.status]
                    } rounded-full px-3 py-1 text-xs`}>
                    {req.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Change Status
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
