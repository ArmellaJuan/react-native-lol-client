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

  static obtainSumonersData(ids){
    let idsParam = ids.toString();
    return  this.xhr(`${this.naUrl()}v1.4/summoner/${idsParam}`);
  }

  static obtainSummonerLeagueData(id) {
    return  this.xhr(`${this.naUrl()}v2.5/league/by-summoner/${id}/entry`);
  }

  static recentGames(id) {
    return  this.xhr(`${this.naUrl()}v1.3/game/by-summoner/${id}/recent`);
  }

  static championInfo(id){
    return  this.xhr(`${this.globalUrl()}static-data/na/v1.2/champion/${id}`).then( (response) =>{

      let championInfo ={
        ...response,
        imageUrl: `https://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/${response.key}.png`,
      };

      return championInfo;
    });
  }

  static naUrl(){
    return "https://na.api.pvp.net/api/lol/las/";
  }

  static globalUrl(){
    return "https://global.api.pvp.net/api/lol/";
  }

  static profileIconUrl(iconId){
    return `https://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/${iconId}.png`;
  }

  static itemUrl(itemId){
    return `https://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/${itemId}.png`;
  }

  static gameDetail(id){
    return  this.xhr(`${this.naUrl()}v2.2/match/${id}`);
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
