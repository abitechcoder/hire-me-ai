"use client";

import React, { useState, useEffect } from 'react'
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import appwriteService from '@/appwrite/config';
import Loading from '@/components/ui/Loading';


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    appwriteService.isLoggedIn()
      .then((loggedIn) => setAuthStatus(Boolean(loggedIn)))
      .finally(() => setLoading(false)
      );
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {
        loading ? (
          <Loading text="Initializing..." className="min-h-screen" />
        ) : (
          <div>
            {!authStatus ? (
              <>
                <Header />
                <main>{children}</main>
                <Footer />
              </>
            ) : (<>
              <ClientHeader />
              <main>{children}</main>
            </>)}
          </div>
        )
      }
    </AuthProvider>
  )
}

export default ProtectedLayout