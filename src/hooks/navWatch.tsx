'use client';

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export default function NavWatch() {
    useEffect(() => {
        const updateOnScroll = () => {
            const scroll = window.scrollY;
            const height = window.innerHeight;
            const total = document.body.scrollHeight;
            const progress = (scroll / (total - height)) * 100;
            nprogress.set(progress);
        }

        window.addEventListener('scroll', updateOnScroll);

        return () => window.removeEventListener('scroll', updateOnScroll);
    }, [])
    
    return null;
}