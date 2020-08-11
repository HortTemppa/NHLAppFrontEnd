import axios from "axios";

const baseUrl = "http://localhost:3001/api/nhl";

class NHLService {
  constructor() {}

  getStandings() {
    return axios.get(`${baseUrl}/leagueStandings`);
  }
}

export default NHLService;
