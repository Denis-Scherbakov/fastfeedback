import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const fireBaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
};

const app = initializeApp(fireBaseConfig);
export const auth = getAuth(app);
