import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateOrderStatus } from '@/store/slices/orderSlice';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/common/Header";
import { addCategory, addItemToCategory, removeItemFromCategory, updateCategory, removeCategory } from "@/store/slices/categorySlice";
import { FaTrashCan } from "react-icons/fa6";

export default function AdminPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [serviceName] = useState("IntraServe Admin Panel");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState('');
  const categories = useSelector((state: RootState) =>
    (state.categories as RootState['categories']).categories
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const orders = useSelector((state: RootState) =>
    (state.orders as RootState['orders']).orders
  );
  const dispatch = useDispatch();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <Header
        theme={theme}
        serviceName={serviceName}
        setTheme={setTheme}
        setShowSettings={setShowSettings}
        showSettings={showSettings}
      />

      <div className="max-w-5xl mx-auto space-y-6 p-4">
        {/* Toggle View Button */}
        <div className="flex justify-end ">
          <Button
            className="text-black dark:bg-black dark:text-white cursor-pointer"
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            Switch to {viewMode === 'grid' ? 'List' : 'Grid'} View
          </Button>
        </div>

        {/* Department Requests */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Department Requests</h2>

            {viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="p-2">Type & Items</th>
                      <th className="p-2">Requested By</th>
                      <th className="p-2">Timestamp</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((req) => (
                      <tr key={req.id} className="border-b align-top">
                        <td className="p-2">
                          <div className="font-semibold italic inline-block mr-2">{req.type}</div>
                          <span className="text-sm italic">{req.items.map(item => `${item.quantity} × ${item.name}`).join(', ')}</span>
                        </td>
                        <td className="p-2">{req.person}</td>
                        <td className="p-2">{req.timestamp}</td>
                        <td className="p-2">{req.status}</td>
                        <td className="p-2 space-x-2">
                          <Button size="sm" onClick={() => dispatch(updateOrderStatus({ id: req.id, status: 'In Progress' }))}>Accept</Button>
                          <Button size="sm" variant="outline" onClick={() => dispatch(updateOrderStatus({ id: req.id, status: 'Answered' }))}>Answered</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  orders.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 text-center text-gray-500">
                      No requests available.
                    </div>
                  ) :
                    orders.map((req) => (
                      <Card key={req.id} className="border">
                        <CardContent className="p-4 space-y-2">
                          <div>
                            <strong>Type:</strong>{' '}
                            <span className="italic text-sm">
                              ({req.type}: {req.items.map(item => `${item.quantity} × ${item.name}`).join(', ')})
                            </span>
                          </div>
                          <div><strong>Requested By:</strong> {req.person}</div>
                          <div><strong>Time:</strong> {req.timestamp}</div>
                          <div><strong>Status:</strong> {req.status}</div>

                          <div className="space-x-2 pt-2">
                            <Button className='cursor-pointer' size="sm" onClick={() => dispatch(updateOrderStatus({ id: req.id, status: 'In Progress' }))}>Accept</Button>
                            <Button className='cursor-pointer' size="sm" variant="outline" onClick={() => dispatch(updateOrderStatus({ id: req.id, status: 'Answered' }))}>Answered</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manage Categories */}
        <Card>
          <CardContent className="p-4 md:p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <div className="pt-6 border-t flex items-center justify-between">
              <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
              <Button className='cursor-pointer' onClick={() => setShowCategoryModal(true)}>Add Category</Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {categories.map((cat) => (
                <div key={cat.id} className="rounded-lg border p-4 bg-white dark:bg-zinc-800 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    {editingCategoryId === cat.id ? (
                      <input
                        value={editedLabel}
                        onChange={(e) => setEditedLabel(e.target.value)}
                        onBlur={() => {
                          dispatch(updateCategory({ id: cat.id, newLabel: editedLabel }));
                          setEditingCategoryId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            dispatch(updateCategory({ id: cat.id, newLabel: editedLabel }));
                            setEditingCategoryId(null);
                          }
                        }}
                        className="text-lg font-semibold border-b w-full dark:bg-zinc-800"
                        autoFocus
                      />
                    ) : (
                      <div className="flex justify-between items-center w-full">
                        <h3
                          className="text-lg font-semibold cursor-pointer"
                          onClick={() => {
                            setEditedLabel(cat.label);
                            setEditingCategoryId(cat.id);
                          }}
                        >
                          {cat.label}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => dispatch(removeCategory(cat.id))}
                        >
                            <FaTrashCan />

                        </Button>
                      </div>
                    )}
                  </div>


                  <ul className="space-y-2">
                    {cat.items.map(item => (
                      <li key={item.name} className="flex justify-between items-center text-sm border-b pb-1">
                        <span>{item.name}</span>
                        <Button className='cursor-pointer' size="sm" variant="ghost" onClick={() => dispatch(removeItemFromCategory({ categoryId: cat.id, itemName: item.name }))}>
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = (e.target as any).elements.itemName;
                      if (input.value.trim()) {
                        dispatch(addItemToCategory({ categoryId: cat.id, itemName: input.value }));
                        input.value = "";
                      }
                    }}
                    className="flex items-center gap-2 pt-2"
                  >
                    <input
                      name="itemName"
                      placeholder="New item"
                      className="flex-1 px-3 py-1.5 border rounded text-sm dark:bg-zinc-900"
                    />
                    <Button className='cursor-pointer' size="sm" type="submit">Add</Button>
                  </form>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {showCategoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg shadow-lg">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Add New Category</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as any;
                    dispatch(addCategory({ id: form.catId.value, label: form.catLabel.value }));
                    form.reset();
                    setShowCategoryModal(false);
                  }}
                  className="space-y-4"
                >
                  <input
                    name="catId"
                    placeholder="Category ID"
                    className="w-full px-3 py-2 border rounded text-sm dark:bg-zinc-800"
                    required
                  />
                  <input
                    name="catLabel"
                    placeholder="Category Label"
                    className="w-full px-3 py-2 border rounded text-sm dark:bg-zinc-800"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button className='cursor-pointer' variant="outline" onClick={() => setShowCategoryModal(false)} type="button">Cancel</Button>
                    <Button className='cursor-pointer' type="submit">Add</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}