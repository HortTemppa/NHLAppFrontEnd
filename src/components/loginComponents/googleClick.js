import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByFyuGpBARbnjROgOMjrY0troSrkkwMwI",
  authDomain: "nhlapp-8f550.firebaseapp.com",
  databaseURL: "https://nhlapp-8f550.firebaseio.com",
  projectId: "nhlapp-8f550",
  storageBucket: "nhlapp-8f550.appspot.com",
  messagingSenderId: "553639611444",
  appId: "1:553639611444:web:531e0bc4e959dbf0948e61",
  measurementId: "G-1EVVR3MSP8",
};

firebase.initializeApp(firebaseConfig);

export const googleClick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result.user);
      console.log(result.credential.accessToken);

      return result.user.uid;
    })
    .catch((error) => console.log(error.message));
};
