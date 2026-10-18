// Required for: Handling user authentication, session persistence, and securely routing unauthenticated users to the login screen.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const TOKEN_KEY = "chordlab-user-token";
const ACCOUNT_KEY = "chordlab-user-account";

export interface UserAccount {
  id: string;
  email: string;
  role: "user";
}

interface AuthContextValue {
  account: UserAccount | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Simulates a network login request by returning mock tokens after a brief delay
async function submitCredentials(path: string, email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const payload = {
    token: "mock-user-token-123",
    account: { id: "demo-123", email: email, role: "user" as const }
  };

  localStorage.setItem(TOKEN_KEY, payload.token);
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(payload.account));
  
  return payload.account;
}

// Global provider that checks local storage on startup to keep the user logged in across browser refreshes
export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setReady(true);
      return;
    }

    const cached = localStorage.getItem(ACCOUNT_KEY);
    if (cached) {
      try {
        if (active) setAccount(JSON.parse(cached) as UserAccount);
      } catch {
        localStorage.removeItem(ACCOUNT_KEY);
      }
    }
    setReady(true);
    return () => {
      active = false;
    };
  }, []);

  // Sets up the mock session payload in state and local storage when a user inputs their email/password
  async function signIn(email: string, password: string) {
    // 1. Fake a network delay for the demo
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 2. Create a fake user profile based on what was typed
    const mockProfile: UserAccount = { id: "demo-123", email: email, role: "user" };
    
    // 3. Save the fake session so you stay logged in if you refresh
    localStorage.setItem(TOKEN_KEY, "mock-user-token");
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(mockProfile));
    
    // 4. Update the app state to let you in
    setAccount(mockProfile);
  }

  // Alias for sign in during this frontend mock implementation
  async function register(email: string, password: string) {
    // For a frontend demo, registering and signing in do the exact same thing!
    await signIn(email, password);
  }

  // Wipes all user traces from local browser memory to ensure absolute logout
  async function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACCOUNT_KEY);
    setAccount(null);
  }

  return (
    <AuthContext.Provider value={{ account, ready, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook that lets other components trigger login/logout functions and read the active profile
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}