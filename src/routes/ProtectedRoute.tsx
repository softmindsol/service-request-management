import { useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "@/api/api";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: ReactNode;
    isPublicOnly?: boolean;
}

const getCookie = (name: string): string | null => {
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="));
    return match ? decodeURIComponent(match.split("=")[1]) : null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isPublicOnly = false }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const refreshToken = getCookie("refreshToken");

            if (!refreshToken) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await api.get("/refresh-token", { withCredentials: true });
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300">
                    <Loader2 className="animate-spin w-8 h-8 mb-2" />
                    <p>Checking authentication...</p>
                </div>
            </div>
        );
    }

    // ✅ If user is authenticated and this is a public-only page
    if (isAuthenticated && isPublicOnly) {
        return <Navigate to={location.state?.from || "/service-request"} replace />;
    }

    // ❌ If user is not authenticated and route is protected
    if (!isAuthenticated && !isPublicOnly) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // ✅ Otherwise allow access
    return <>{children}</>;
};

export default ProtectedRoute;
