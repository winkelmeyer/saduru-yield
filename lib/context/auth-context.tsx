"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AuthContextType, AuthState } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error fetching session:", error.message);
        setState(prev => ({ ...prev, isLoading: false, error: error.message }));
        return;
      }

      if (session?.user?.email) {
        console.log("Session found:", session.user.email);
        setState({
          user: {
            ...session.user,
            email: session.user.email
          },

          isLoading: false,
          error: null,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
       
      async (event, session) => {
        if (session?.user?.email) {
        console.log("Auth state changed:", event);
        setState({
          user: {
            ...session.user,
            email: session.user.email
          },
          isLoading: false,
          error: null,
        });
      }
      else {
      setState(prev => ({ ...prev, isLoading: false }));
        }
      } 
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Redirect to login after successful signup
      router.push('/login?message=Please check your email to verify your account');
    } catch (error) {
      console.error("Error signing up:", error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/dashboard');
    } catch (error) {
      console.error("Error signing in:", error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
      setState(prev => ({ ...prev, error: error instanceof Error ? error.message : 'Unknown error' }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 