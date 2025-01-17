import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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

const db = firebase.firestore();

//const baseUrl = "http://192.168.8.101:3001/api/nhl";
const baseUrl = "/api/nhl";

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

  getTeams() {
    return api.get(`${baseUrl}/teams`);
  }

  getTeam(id) {
    return api.get(`${baseUrl}/team/${id}`);
  }

  getPlayer(id) {
    return api.get(`${baseUrl}/player/${id}/20192020`);
  }

  getTeamRoster(id) {
    return api.get(`${baseUrl}/teamPlayers/${id}`);
  }

  getLeaderboards(type, sortBy, season) {
    return api.get(`${baseUrl}/pointleaders/${type}/${sortBy}/${season}`);
  }

  checkLogin() {
    if (document.cookie) {
      this.userId = cookies.get("id");
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  logout() {
    cookies.erase("id");

    this.userId = null;
    this.loggedIn = false;
    this.loggedInChangeListener(false);
  }

  async checkIfUserExists(uid) {
    const collection = await db.collection("users");

    return await collection
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return true;
        } else {
          return false;
        }
      });
  }

  getUserId() {
    return this.userId;
  }

  registerUser() {
    const collection = db.collection("users");

    collection
      .doc(`${this.userId}`)
      .set({ favoriteTeams: [], favoritePlayers: [] });
    document.cookie = `id=${this.userId}; max-age=3600`;

    this.loggedIn = true;
    this.loggedInChangeListener(true);
    return;
  }

  googleClick() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        let userExists = await this.checkIfUserExists(result.user.uid);

        if (userExists) {
          document.cookie = `id=${result.user.uid}; max-age=3600`;

          this.userId = result.user.uid;
          this.loggedIn = true;
          this.loggedInChangeListener(true);

          return true;
        } else {
          this.userId = result.user.uid;
          return false;
        }
      })
      .catch((error) => {
        this.loggedInChangeListener(false);
      });
  }

  async addFavoritePlayer(playerId) {
    const collection = await db.collection("users");

    collection.doc(this.userId).update({
      favoritePlayers: firebase.firestore.FieldValue.arrayUnion(playerId),
    });
  }

  async removeFavoritePlayer(playerId) {
    const collection = await db.collection("users");

    collection.doc(this.userId).update({
      favoritePlayers: firebase.firestore.FieldValue.arrayRemove(playerId),
    });
  }

  async checkIfPlayerIsFavorited(playerId) {
    const collection = await db.collection("users");

    const favorites = await collection.doc(this.userId).get();

    const playerIncludedInFavorites = favorites
      .data()
      .favoritePlayers.includes(playerId);

    return playerIncludedInFavorites;
  }

  async getFavoritePlayers() {
    const collection = await db.collection("users");

    const userData = await collection.doc(this.userId).get();

    const favorites = await userData.data();

    let favoritePlayers = Promise.all(
      favorites.favoritePlayers.map(async (id) => {
        try {
          let player = await this.getPlayer(id);


          return player.data[0];
        } catch (error) {
          console.error(error);
        }
      })
    );

    return favoritePlayers;
  }

  async getFavoriteTeams() {
    const collection = await db.collection("users");

    const userData = await collection.doc(this.userId).get();

    const favorites = await userData.data();

    let favoriteTeams = Promise.all(
      favorites.favoriteTeams.map(async (id) => {
        try {
          let team = await this.getTeam(id);

          return team.data;
        } catch (error) {
          console.error(error);
        }
      })
    );

    return favoriteTeams;
  }

  async checkIfTeamIsFavorited(teamId) {
    const collection = await db.collection("users");

    const favorites = await collection.doc(this.userId).get();

    const teamIncludedInFavorites = favorites
      .data()
      .favoriteTeams.includes(teamId);

    return teamIncludedInFavorites;
  }

  async addFavoriteTeam(teamId) {
    const collection = await db.collection("users");

    collection.doc(this.userId).update({
      favoriteTeams: firebase.firestore.FieldValue.arrayUnion(teamId),
    });
  }

  async removeFavoriteTeam(teamId) {
    const collection = await db.collection("users");

    collection.doc(this.userId).update({
      favoriteTeams: firebase.firestore.FieldValue.arrayRemove(teamId),
    });
  }
}

export default NHLService;
