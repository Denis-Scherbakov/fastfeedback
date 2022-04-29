import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const fireBaseConfig = {
  apiKey: "AIzaSyDcNB_5m0779_XSgB-Po0QXrxnhF6YJWqY",
  authDomain: "fast-feedback-91cf8.firebaseapp.com",
  projectId: "fast-feedback-91cf8",
};

const app = initializeApp(fireBaseConfig);
export const auth = getAuth(app);
