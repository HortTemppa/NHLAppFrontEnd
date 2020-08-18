import axios from "axios";

const baseUrl = "http://192.168.8.101:3001/api/nhl";

class NHLService {
  constructor() {}

  getStandings() {
    return axios.get(`${baseUrl}/leagueStandings`);
  }

  getTeam(id) {
    return axios.get(`${baseUrl}/team/${id}`);
  }
}

export default NHLService;
