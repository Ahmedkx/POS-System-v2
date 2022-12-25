import React, { useEffect } from "react"
import { db } from "../../Firebase-config"
import {collection,onSnapshot,query,orderBy} from "firebase/firestore";

export default function useGetData(collectionName){
    const [data, setData] = React.useState([])

    useEffect(()=>{
        const getUsers = async (collectionName) => {
            const q = query(collection(db, collectionName));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                products.push({id:doc.id, ...doc.data()});
            });
                setData(products)
                // console.log("API Call")
        });
    };
    getUsers(collectionName)
    },[])

        return [data]
}