// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMBgNKJufb44kTd0nWPP2X-DT2LpSrgBQ",
    authDomain: "contacts-list-c3206.firebaseapp.com",
    projectId: "contacts-list-c3206",
    storageBucket: "contacts-list-c3206.appspot.com",
    messagingSenderId: "186319300615",
    appId: "1:186319300615:web:4b5a0f0fc415e282e662a2",
    measurementId: "G-2Q2SGV5H13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

class Contact {
    static async save(data) {
        console.table(data);
        try {
        const docRef = await addDoc(collection(db, 'Contacts'), {
            name: data.name,
            phone: data.phone
        });
        //console.log('Document written with ID: ', docRef.id);
        return 'Documento creado exitosamente con ID: ' + docRef.id;
        } catch (error) {
        //console.error('Error adding document: ', error);
        return 'Error al crear el documento: ' + error.message;
        }
    }

    static async delete(id) {
        try {
            await deleteDoc(doc(db, 'Contacts', id));
            return 'Documento eliminado exitosamente';
            } catch (error) {
            return 'Error al eliminar el documento: ' + error.message;
            }
        }

    static async update(data) {
        try {
        await updateDoc(doc(db, 'Contacts', data.id), {
            name: data.name,
            phone: data.phone
        });
        return 'Documento actualizado exitosamente';
        } catch (error) {
        return 'Error al actualizar el documento: ' + error.message;
        }
    }

    static async getAll() {
        const querySnapshot = await getDocs(collection(db, 'Contacts'));
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({ id: doc.id, data: doc.data() });
        });
        return contacts;
    }
}

export default Contact