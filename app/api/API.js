class Api {
  
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    };
  }

  static obtainSummonerData(name) {
    return  this.xhr(`${this.naUrl()}v1.4/summoner/by-name/${name}`);
  }

  static obtainSummonerLeagueData(id) {
    return  this.xhr(`${this.naUrl()}v2.5/league/by-summoner/${id}/entry`);
  }

  static recentGames(id) {
    return  this.xhr(`${this.naUrl()}v1.3/game/by-summoner/${id}/recent`);
  }

  static championInfo(id){
    return  this.xhr(`${this.globalUrl()}static-data/na/v1.2/champion/${id}`);
  }

  static naUrl(){
    return "https://na.api.pvp.net/api/lol/las/";
  }

  static globalUrl(){
    return "https://global.api.pvp.net/api/lol/";
  }

  static xhr(url) {
    const keyParam = '?api_key=403fb85e-20f7-4c8e-ac5c-a47402a2ac7c';
    const finalUrl = `${url}${keyParam}`;
    let options = Object.assign({ method: 'GET' }, null );
    options.headers = Api.headers();
    return fetch(finalUrl, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then(err => {throw err;} );
    });
  }
}
export default Api;
