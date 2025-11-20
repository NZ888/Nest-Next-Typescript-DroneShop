"use client"
import {ReactNode} from 'react';
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [portalRoot, setPortalRoot] = useState<Element | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPortalRoot(document.getElementById("portal-root"));
        setMounted(true);
    }, [])
    if(!mounted || !portalRoot) return null;

    return createPortal(children, portalRoot);
}