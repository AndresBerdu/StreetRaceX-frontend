import { useEffect, useState, useRef } from "react";

type ContentType = "json" | "form-data";

type FetchOptions<T> = {
    url: string;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    contentType?: ContentType;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    onUnauthorized?: () => void;
};

const toFormData = (body: unknown): FormData => {
    const formData = new FormData();

    Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value);
            return;
        }
        if (value === null || value === undefined) return;

        if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
            return;
        }

        if (typeof value === "string" && value.trim() === "") return;

        formData.append(key, String(value));
    });

    return formData;
};

let refreshPromise: Promise<boolean> | null = null;

const tryRefreshToken = async (refreshUrl: string): Promise<boolean> => {
    if (refreshPromise) return refreshPromise;

    refreshPromise = fetch(refreshUrl, {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.ok)
        .catch(() => false)
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
};

export const useFetch = <T>({
    url,
    method = "POST",
    contentType = "json",
    onSuccess,
    onError,
    onUnauthorized,
}: FetchOptions<T>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const onUnauthorizedRef = useRef(onUnauthorized);
    onUnauthorizedRef.current = onUnauthorized;

    useEffect(() => {
        if (method === "GET") execute(undefined);
    }, [url]);

    const buildRequest = (body: unknown) => {
        const isGet = method === "GET";

        const headers: HeadersInit =
            !isGet && contentType === "json"
                ? { "Content-Type": "application/json" }
                : {};

        const bodyContent = isGet
            ? undefined
            : contentType === "json"
                ? JSON.stringify(body)
                : toFormData(body);

        return { headers, bodyContent };
    };

    const execute = async (body: unknown, overrideUrl?: string) => {
        setIsLoading(true);
        setError(null);

        const targetUrl = overrideUrl ?? url;

        try {
            const { headers, bodyContent } = buildRequest(body);

            let res = await fetch(targetUrl, {
                method,
                headers,
                body: bodyContent,
                credentials: "include",
            });

            if (res.status === 401) {
                const refreshed = await tryRefreshToken("http://localhost:8000/api/auth/refresh-session");

                if (refreshed) {
                    res = await fetch(targetUrl, {
                        method,
                        headers,
                        body: bodyContent,
                        credentials: "include",
                    });
                } else {
                    onUnauthorizedRef.current?.();
                    throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");
                }
            }

            const result = await res.json();

            if (!res.ok) {
                const errorMessage = Array.isArray(result.error)
                    ? result.error.map((e: { message: string }) => e.message).join(", ")
                    : result.error ?? "Error en la petición";

                throw new Error(errorMessage);
            }

            setData(result);
            onSuccess?.(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error inesperado";
            setError(message);
            onError?.(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { execute, isLoading, error, data };
};