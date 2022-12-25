import { db } from "../../Firebase-config";
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";

export const getDocument = async(collec,name,value)=>{
    const q = query(collection(db, "Products"), where("autobarcode", "==", true));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log({id:doc.id,...doc.data()})
        // setDocument({id:doc.id,...doc.data()})
    });
}

getDocument()