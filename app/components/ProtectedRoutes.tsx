"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoutesProps {
  children: React.ReactNode;
  user: boolean; // ✅ This now correctly gets `isAuthenticated`
}

const ProtectedRoutes = ({ children, user }: RoutesProps) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (!user && window.location.pathname !== "/login") {
      router.replace("/login");
    } else if (user && window.location.pathname === "/login") {
      router.replace("/");
    }
  }, [user, router, hasMounted]);

  if (!hasMounted) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoutes;
