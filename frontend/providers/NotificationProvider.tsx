"use client"

import React, {useContext, createContext, ReactNode, useState, useRef, useCallback, useMemo} from "react";
import {createPortal} from "react-dom";

type NoticeType = "success" | "error" | "info" | "warning";

type Notice = {
    id: string;
    message: string;
    type: NoticeType;
    durationMs: number;
}
type NotifyFn = (message: string, type?: NoticeType, durationMS?: number) => void;

const NotificationContext = createContext<{notify: NotifyFn} | null>(null);

export function useNotify(){
    const ctx = useContext(NotificationContext)
    if (!ctx) throw new Error("useNotify must be used inside <NotificationProvider />");
    return ctx.notify;
}
function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
export function NotificationProvider({children}: {children: ReactNode}) {
    const [notices, setNotices] = useState<Notice[]>([]);
    const timers = useRef(new Map<string, number>)

    const remove = useCallback((id: string) => {
        setNotices((prev) => prev.filter((n) => n.id !== id));

        const t = timers.current.get(id);
        if(t) window.clearTimeout(t);
        timers.current.delete(id);
    }, [])

    const notify = useCallback<NotifyFn>(
        (message, type = "success", durationMs = 8000) => {
            const id = uid()

            const notice: Notice = {id, message, type, durationMs};
            setNotices((prev) => [notice, ...prev]);

            const timeoutId = window.setTimeout(() => remove(id), durationMs)
            timers.current.set(id, timeoutId);
        }, [remove]
    )
    const value = useMemo(() => ({ notify }), [notify]);

    return(
        <NotificationContext.Provider value={value}>
            {children}
            <NotificationViewport notices={notices} onClose={remove} />
        </NotificationContext.Provider>
    )
}
function NotificationViewport({notices, onClose}: { notices: Notice[]; onClose: (id: string) => void; }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div style={styles.viewport}>
            {notices.map((n) => (
                <div
                    key={n.id}
                    role="status"
                    aria-live="polite"
                    style={{ ...styles.banner, ...typeStyles[n.type] }}
                >
                    <div style={styles.text}>{n.message}</div>
                    <button onClick={() => onClose(n.id)} style={styles.closeBtn}>
                        ×
                    </button>
                </div>
            ))}
        </div>,
        document.body
    );
}


const styles: Record<string, React.CSSProperties> = {
    viewport: {
        position: "fixed",
        top: 12,
        left: 12,
        right: 12,
        zIndex: 9999,
        display: "grid",
        gap: 10,
        pointerEvents: "none",
    },
    banner: {
        pointerEvents: "auto",
        height: 44,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        fontSize: 16,
        fontWeight: 500,
        padding: "0 48px 0 16px",
        overflow: "hidden",
        userSelect: "none",
    },
    text: {
        textAlign: "center",
        width: "100%",
    },
    closeBtn: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "none",
        background: "rgba(0,0,0,0.15)",
        color: "#fff",
        cursor: "pointer",
        fontSize: 20,
        lineHeight: "28px",
    },
};

const typeStyles: Record<NoticeType, React.CSSProperties> = {
    success: { background: "#3f7f49", color: "#0b1a0e" },
    error: { background: "#c23b3b", color: "#fff" },
    info: { background: "#3b6cc2", color: "#fff" },
    warning: { background: "#c2a23b", color: "#1a1406" },
};


