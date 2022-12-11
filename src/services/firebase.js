import * as firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const app = firebase.initializeApp({
  apiKey: "AIzaSyAhZwj89uwnA9rpOTocsrxJDVUvw5SYKVY",
  authDomain: "tatvic-demo.firebaseapp.com",
  projectId: "tatvic-demo",
  storageBucket: "tatvic-demo.appspot.com",
  messagingSenderId: "254655032848",
  appId: "1:254655032848:web:660473ede1cbcc88806495",
  measurementId: "G-V6CZXBZ8MC",
});

export const auth = getAuth(app);
// const provider = new getAuth(app).GoogleAuthProvider();
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
