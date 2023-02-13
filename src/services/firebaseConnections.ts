import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBUztyt0sEGDeSHK08zoGrD5Cc6cQ3zje0",
  authDomain: "tarefator-app.firebaseapp.com",
  projectId: "tarefator-app",
  storageBucket: "tarefator-app.appspot.com",
  messagingSenderId: "210157391022",
  appId: "1:210157391022:web:fabe44b38eb9574fd1f13f",
  measurementId: "G-70D5PRJ6F7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const add = async (path: string, data: Object) => {
  try {
    return await addDoc(collection(db, path), data);
  } catch (e) {
    console.log('error adding document', e);
  }
}

export const getTasks = async () => {  
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const taskList = querySnapshot.docs.map((doc) => ({
     ...doc.data(),
     id: doc.id,
     })
 );
 return taskList;
 }

 export const deleteTask = async (value: string) => {
  await deleteDoc(doc(db, "tasks", value));
 }

 export const refreshTask = async(value: string, text: string) => {
  const washingtonRef = doc(db, "tasks", value);
  await updateDoc(washingtonRef, {
    task: text
  });
}

export const getDocTask = async(idTask: string) => {
  const docRef = doc(db, "tasks", idTask);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}
