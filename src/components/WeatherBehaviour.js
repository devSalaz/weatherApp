class WeatherBehaviour {
  constructor() {
    this.bind();
  }

  init(scene, camera, customCursor) {
    this.scene = scene;
    this.camera = camera;
    this.customCursor = customCursor;
  }

  onWeatherChanged(currentWeather) {
    if (currentWeather) {
      this.displayCurrentWeatherIcon(currentWeather.weather[0].icon);
    }
  }

  displayCurrentWeatherIcon(currentWeatherIcon) {
    switch (currentWeatherIcon) {
      case "01d":
        console.log("Sol solo");
        break;
      case "01n":
        console.log("Luna sola");
        break;
      case "02d":
        console.log("Sol con nube pequeña");
        break;
      case "02n":
        console.log("Luna con nube pequeña");
        break;
      case "03d":
        console.log("Nube con sol pequeño");
        break;
      case "03n":
        console.log("Nube con luna pequeña");
        break;
      case "04d":
      case "04n":
        console.log("Nube sola");
        break;
      case "09d":
      case "09n":
        console.log("Nube con gotas pequeñas");
        break;
      case "10d":
      case "10n":
        console.log("Nube con gotas grandes");
        break;
      case "11d":
      case "11n":
        console.log("Nube con gotas pequeñas y rayo");
        break;
      case "13d":
      case "13n":
        console.log("Copo de nieve");
        break;
      case "50d":
      case "50n":
        console.log("Viento");
        break;
      default:
        console.log("Default entered");
    }
  }

  bind() {}
}

const _instance = new WeatherBehaviour();
export default _instance;
