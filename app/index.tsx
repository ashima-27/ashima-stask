import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("./routes/login/index");
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}
