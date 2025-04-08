// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { LogOut } from "lucide-react";
// import { Sidebar } from "./Sidebar";

// const requests = [
//   {
//     id: 1,
//     service: "Drinks",
//     status: "Pending",
//     department: "Kitchen",
//     timestamp: "10:35 AM",
//     notes: "Need cold coffee",
//   },
//   {
//     id: 2,
//     service: "Reception Call",
//     status: "In Progress",
//     department: "Reception",
//     timestamp: "11:10 AM",
//     notes: "",
//   },
// ];


// export default function AdminDashboard() {
//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main content */}
//       <div className="flex-1 p-4 md:p-6 space-y-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
//           <h1 className="text-2xl font-bold">Admin Panel</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-gray-600">Admin User</span>
//             <Button variant="outline" size="sm">
//               <LogOut className="w-4 h-4 mr-1" /> Logout
//             </Button>
//           </div>
//         </div>

//         {/* Filter section */}
//         <div className="flex flex-wrap gap-4 items-center">
//           <Input placeholder="Search notes..." className="w-full sm:w-60" />
//           <Select>
//             <SelectTrigger className="w-full sm:w-48">
//               <SelectValue placeholder="Filter by Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All</SelectItem>
//               <SelectItem value="Pending">Pending</SelectItem>
//               <SelectItem value="In Progress">In Progress</SelectItem>
//               <SelectItem value="Completed">Completed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Request List */}
//         <ScrollArea className="h-[60vh] pr-2">
//           <div className="grid gap-4">
//             {requests.map((req) => (
//               <Card
//                 key={req.id}
//                 className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//                 <div>
//                   <div className="font-semibold">{req.service}</div>
//                   <div className="text-sm text-gray-500">
//                     {req.timestamp} • {req.department}
//                   </div>
//                   {req.notes && <div className="mt-1 text-sm">{req.notes}</div>}
//                 </div>
//                 <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
//                   <Badge
//                     className={`$ {
//                       statusColor[req.status]
//                     } rounded-full px-3 py-1 text-xs`}>
//                     {req.status}
//                   </Badge>
//                   <Button variant="outline" size="sm">
//                     Change Status
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </ScrollArea>
//       </div>
//     </div>
//   );
// }


// components/AdminPage.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "./Header";

export default function AdminPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [serviceName] = useState("IntraServe Admin Panel");

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>

      {/* Header with theme and settings */}
      <Header
        theme={theme}
        serviceName={serviceName}
        setTheme={setTheme}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      <div className="max-w-5xl mx-auto space-y-6 p-4">
        {/* Department Requests */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Department Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="p-2">Type</th>
                    <th className="p-2">Timestamp</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Food</td>
                    <td className="p-2">10:24 AM</td>
                    <td className="p-2">Pending</td>
                    <td className="p-2 space-x-2">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Answered</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Admin Controls */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manage service categories</li>
              <li>Assign departments</li>
              <li>View reports/logs</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

