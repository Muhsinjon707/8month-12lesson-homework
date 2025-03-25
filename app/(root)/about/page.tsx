"use client";

import React, { useState, useEffect } from "react";

// Cloud Store
import { db } from "@/app/firebase/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";
import { div } from "framer-motion/m";

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "favorites"));

  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
}

const About = () => {
  const [userData, setUserData] = useState<any[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="mt-20 min-h-screen">
      <h2>About page</h2>

      <div>
        {userData.length > 0 &&
          userData.map((data) => {
            return (
              <div key={data.id}>
                <h3>Title: {data.title}</h3>
                <p>Text: {data.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default About;
