import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
<<<<<<< HEAD
      router.push("./routes/onBoarding");
=======
      router.push("./routes/login");
>>>>>>> 97595db90dcee25f9e85e97bf40b78e3285c9154
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return null;
}
