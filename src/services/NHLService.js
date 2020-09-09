import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import * as firebase from "firebase/app";
import "firebase/auth";
import cookies from "browser-cookies";

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

const baseUrl = "http://192.168.8.101:3001/api/nhl";

const cache = setupCache({
  maxAge: 10 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

class NHLService {
  constructor() {
    this.userId = null;
    this.loggedIn = null;
    this.loggedInChangeListener = () => {};
    this.checkLogin();
  }

  onLoggedInChange(listener) {
    this.loggedInChangeListener = listener;
  }

  getStandings() {
    return api.get(`${baseUrl}/leagueStandings`);
  }

  getTeam(id) {
    return api.get(`${baseUrl}/team/${id}`);
  }

  getLeaderboards(type, sortBy, season) {
    return api.get(`${baseUrl}/pointleaders/${type}/${sortBy}/${season}`);
  }

  checkLogin() {
    if (document.cookie) {
      this.userId = cookies.get("id");
      this.loggedIn = true;
      this.loggedInChangeListener(true);
    } else {
      this.loggedIn = false;
      this.loggedInChangeListener(false);
    }
    return this.loggedIn;
  }

  logout() {
    cookies.erase("id");

    this.userId = null;
    this.loggedIn = false;
    this.loggedInChangeListener(false);
  }

  googleClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        console.log(result.credential.accessToken);

        document.cookie = `id=${this.id}; max-age=10`;

        this.userId = result.user.uid;
        this.loggedIn = true;
        this.loggedInChangeListener(true);

        return result.user.uid;
      })
      .catch((error) => {
        console.log(error.message);
        this.loggedInChangeListener(false);
      });
  }
}

export default NHLService;
