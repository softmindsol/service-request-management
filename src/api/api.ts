import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        console.log("❗ Interceptor caught error:", error?.response?.status, originalRequest?.url);

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh-token")
        ) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await api.get("/refresh-token", {
                    withCredentials: true,
                });

                console.log(
                  "✅ Token refreshed via /refresh-token",
                  refreshResponse
                );

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error("🔴 Refresh token failed");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Utility to set token globally
export const setAuthToken = (token: string | null): void => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export default api;
