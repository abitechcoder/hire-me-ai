"use client";

import React, {use, useEffect} from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const layout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const { authStatus } = useAuth();

    useEffect(() => {
        if (!authStatus) {
        router.replace('/login');
    }
    }, [authStatus, router]);

  return (
    children
  )
}

export default layout