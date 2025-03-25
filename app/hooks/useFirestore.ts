// Firebase imports
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Toastify
import { toast } from "react-toastify";
import { UnsplashPhoto } from "../model/UnspashPhoto";

export const useFirestore = () => {
  const addDocumentToFavorites = async (
    collectionName: string,
    id: string,
    data: UnsplashPhoto,
  ) => {
    try {
      await setDoc(doc(db, collectionName, id), data);
      toast.success("Added successfully to favorites 🩷");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Something went wrong. You couldn't add a new favorite");
    }
  };

  const deleteDocumentFromFavorites = async (
    collectionName: string,
    id: string,
  ) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Removed successfully from favorites 🗑️");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Something went wrong. You couldn't delete a new favorite");
    }
  };

  const addDocumentToDownloads = async (
    collectionName: string,
    id: string,
    data: UnsplashPhoto,
  ) => {
    try {
      await setDoc(doc(db, collectionName, id), data);
      toast.success("Added successfully to downloads ⬇️");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Something went wrong. You couldn't add a new download");
    }
  };

  const deleteDocumentFromDownloads = async (
    collectionName: string,
    id: string,
  ) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Removed successfully from downloads 🚮");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Something went wrong. You couldn't delete a new download");
    }
  };

  return {
    addDocumentToFavorites,
    deleteDocumentFromFavorites,
    addDocumentToDownloads,
    deleteDocumentFromDownloads,
  };
};
