import React, { useEffect } from "react"
import { db } from "../../Firebase-config"
import {collection,onSnapshot,query,orderBy,limit,sort} from "firebase/firestore";

export default function useGetDataLimit(collectionName,number,order1){
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(()=>{
        const getUsers = async (collectionName) => {
            const q = query(collection(db, collectionName),orderBy("invoiceData.date", "desc") , limit(order1));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                products.push({id:doc.id, ...doc.data()});
            });
                setData(products)
                setLoading(false)
        });
    };
    getUsers(collectionName,number,order1)
    },[])

        return [data,loading]
}