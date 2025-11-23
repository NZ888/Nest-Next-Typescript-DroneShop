import {API} from "@/config/api"

export const sendResetCode = async (email: string) => {
    const res = await fetch(API.routes.auth.sendResetCode, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email})
    })
    if (!res.ok) {
        let errText = "Unknown server error";

        try {
            const json = await res.json();
            if (json?.message) errText = json.message;
        } catch {
            const text = await res.text();
            if (text) errText = text;
        }

        throw new Error(errText);
    }

    return res.json()
}

export const verifyResetCode = async (email: string, code: string) => {
    const res = await fetch(API.routes.auth.verifyResetCode, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, code})
    })
    if (!res.ok) {
        let errText = "Unknown server error";

        try {
            const json = await res.json();
            if (json?.message) errText = json.message;
        } catch {
            const text = await res.text();
            if (text) errText = text;
        }

        throw new Error(errText);
    }
    return res.json()
}

export const resetPassword = async (resetToken: string, newPassword: string) => {
    const res = await fetch(API.routes.auth.resetPassword, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({resetToken, newPassword})
    })
    if (!res.ok) {
        let errText = "Unknown server error";

        try {
            const json = await res.json();
            if (json?.message) errText = json.message;
        } catch {
            const text = await res.text();
            if (text) errText = text;
        }

        throw new Error(errText);
    }
    return res.json()
}
export const login = async (email: string, password: string) => {
    const res = await fetch(API.routes.auth.login, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Login failed");
    }

    return res.json();
};

export const logout = async () => {
    await fetch(API.routes.auth.logout, {
        method: "POST",
        credentials: "include",
    });
};

export const refresh = async () => {
    await fetch(API.routes.auth.refresh, {
        method: "POST",
        credentials: "include",
    });
};

export const getMe = async () => {
    const res = await fetch(API.routes.auth.me, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) return null;

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to load user");
    }

    return res.json();
};