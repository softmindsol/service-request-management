import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // using lucide-react icons

import PublicHeader from "@/common/PublicHeader";
import useThemeMode from "@/hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store"; // if using custom typed dispatch
import { registerUser } from "@/store/features/user/user";
import { toast } from "sonner";

export default function Register() {
    const { loading } = useSelector((state: RootState) => state?.user);
    console.log("loading:", loading);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
        image: null as File | null,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { theme, setTheme } = useThemeMode();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "image" && files?.[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }));
    };


    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("username", formData.username);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("role", formData.role);
        if (formData.image) {
            payload.append("image", formData.image);
        }

        dispatch(registerUser(payload)).unwrap()
            .then(() => {
                // Handle successful registration, e.g., redirect or show a message
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    role: "user",
                    image: null,
                });
               toast.success("Registration successful!");
                setPreviewUrl(null); // Reset preview URL after successful registration
                toast.success("Verification email sent. Please check your inbox.");
            })
            .catch(() => {
            toast.error("Registration failed. Please try again.");
                // Handle registration error, e.g., show an error message
            });
    };



    return (
        <div className={`${theme === "dark" ? "dark" : ""}`}>
            <PublicHeader theme={theme} setTheme={setTheme} />

            <div className="h-[calc(100vh-57px)] bg-white dark:bg-gray-900 flex items-center justify-center px-4 overflow-hidden">
                <Card className="w-full max-w-md bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-center">Register</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input name="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Profile Picture</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {previewUrl && (
                                    <div className="mt-3 flex flex-col items-center">
                                        <p className="text-sm text-muted-foreground mb-1">Preview</p>
                                        <img
                                            src={previewUrl}
                                            alt="Profile Preview"
                                            className="w-24 h-24 rounded-full border border-gray-300 shadow object-cover"
                                        />
                                    </div>
                                )}
                            </div>


                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        Creating...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
