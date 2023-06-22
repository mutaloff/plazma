import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCUy4YiFCuVmI_D_GDoNet-YCDJsJSiZyU",
    authDomain: "plazma-company.firebaseapp.com",
    projectId: "plazma-company",
    storageBucket: "plazma-company.appspot.com",
    messagingSenderId: "205133021848",
    appId: "1:205133021848:web:a3bfbe928ff23cdfbd46ed"
};

const app = initializeApp(firebaseConfig);

const firebaseDB = getFirestore(app);

export { firebaseDB };