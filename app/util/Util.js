class Util {
  static parseNumber(number) {
    return number ? number : 0;
  }

  static formatSeconds(seconds)
  {
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes > 0 ? minutes + 'm' : ''} ${seconds}s`;
  }

  static parseSubType(value){
    return value.split('_').join(' ').titleize();
  }

}
export default Util;

