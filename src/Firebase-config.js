import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {collection,addDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";

// FireBase Test

const firebaseConfig = {
    apiKey: "AIzaSyCdpdehR4zBMkSyf1Tw00zZPx_eTd8zK4I",
    authDomain: "prices-4d573.firebaseapp.com",
    projectId: "prices-4d573",
    storageBucket: "prices-4d573.appspot.com",
    messagingSenderId: "628395206382",
    appId: "1:628395206382:web:181d5c16082e30202ff5ff"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const usersCollectionRef = collection(db, "Products");

    // export const getUsers = async (collec) => {
    //     const data = await getDocs(collection(db, collec));
    //     // console.log(data.docs.map((doc)=> ({id:doc.id, ...doc.data()})))
    //     let arr = data.docs.map((doc)=> ({id:doc.id, ...doc.data()}))
    // };

export const createProduct = async (collec,data) => {
    await addDoc(collection(db, collec), { ...data });
};

export const deleteData = async (collec,id) => {
    const userDoc = doc(db, collec, id);
    await deleteDoc(userDoc);
};

export const updateData = async (collec,id, newValue) => {
    const userDoc = doc(db, collec, id);
    await updateDoc(userDoc, newValue);
};