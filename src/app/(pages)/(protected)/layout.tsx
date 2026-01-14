"use client";

import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import appwriteService from '@/appwrite/config'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authStatus } = useAuth();

  useEffect(() => {
    const checkAccess = async () => {
      if (!authStatus) {
        router.replace('/login');
        return;
      }

      const user = await appwriteService.getCurrentUser();

      if (!user) {
        router.replace('/login');
        return;
      }

      // Check for labels and redirect accordingly
      const path = window.location.pathname;

      if (user.labels && user.labels.includes("client")) {
        if (path.includes('/talent')) {
          router.replace('/client/dashboard');
        }
      } else if (user.labels && user.labels.includes("talent")) {
        if (path.includes('/client')) {
          router.replace('/talent/dashboard');
        }
      } else {
        // No role? Redirect to home or selection?
        // For now, if they are on a specific dashboard, kick them out?
        // Or just let them be if they are on a generic protected page.
        // But if they try to access client/talent specific pages without label, redirect home.
        if (path.includes('/client') || path.includes('/talent')) {
          router.replace('/');
        }
      }
    };
    checkAccess();
  }, [authStatus, router]);

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedLayout