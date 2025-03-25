import { useEffect, useState } from "react";

// Firebase imports
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";

export const useCollection = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (querySnapshot) => {
        const queryData: any[] = [];
        querySnapshot.forEach((doc) => {
          queryData.push({ id: doc.id, ...doc.data() });
        });
        setData(queryData);
      },
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data };
};
