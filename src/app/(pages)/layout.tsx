"use client";

import React, { useState, useEffect } from 'react'
import { AuthProvider, AppwriteUser } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ClientHeader from "@/components/ClientHeader";
import TalentHeader from "@/components/TalentHeader";
import Footer from "@/components/Footer";
import appwriteService from '@/appwrite/config';
import Loading from '@/components/ui/Loading';


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [userLabel, setUserLabel] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await appwriteService.isLoggedIn();
        setAuthStatus(Boolean(loggedIn));

        if (loggedIn) {
          const userData = await appwriteService.getCurrentUser();
          if (userData) {
            setUser(userData as AppwriteUser);
            if (userData.labels && userData.labels.length > 0) {
              if (userData.labels.includes("client")) {
                setUserLabel("client");
              } else if (userData.labels.includes("talent")) {
                setUserLabel("talent");
              }
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus, user, setUser, userLabel }}>
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
            ) : (
              <>
                {userLabel === "client" ? (
                  <ClientHeader />
                ) : userLabel === "talent" ? (
                  <TalentHeader />
                ) : (
                  <Header />
                )}
                <main className="mt-20">{children}</main>
              </>
            )}
          </div>
        )
      }
    </AuthProvider>
  )
}

export default ProtectedLayout