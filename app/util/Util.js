import { PixelRatio } from 'react-native';

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

  static pixelSizeFor(layoutSize) {
    return Math.round(layoutSize + PixelRatio.get());
  }

}
export default Util;

