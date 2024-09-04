'use client';

import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export default function NavWatch() {
    useEffect(() => {
        nprogress.start();
    }, [])
    
    return null;
}