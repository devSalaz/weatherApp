import SunFaceEmoji from "../assets/emojis/sun-with-face.png";
import SunGlassesEmoji from "../assets/emojis/smiling-face-with-sunglasses.png";
import SwirlkingFaceEmoji from "../assets/emojis/smirking-face.png";
import MoonFaceEmoji from "../assets/emojis/full-moon-face.png";
import SunWithSmallCloudEmoji from "../assets/emojis/sun-behind-small-cloud.png";
import SparklesEmoji from "../assets/emojis/sparkles.png";
import NewMoonEmoji from "../assets/emojis/new-moon.png";
import CloudWithSunEmoji from "../assets/emojis/sun-behind-cloud.png";
import FaceScreamingEmoji from "../assets/emojis/face-screaming-in-fear.png";
import LastQuarterMoonEmoji from "../assets/emojis/last-quarter-moon-face_.png";
import FirstQuarterMoonEmoji from "../assets/emojis/first-quarter-moon-face.png";
import CloudEmoji from "../assets/emojis/cloud.png";
import YawningFaceEmoji from "../assets/emojis/yawning-face.png";
import CloudSmallDropsEmoji from "../assets/emojis/cloud-with-rain.png";
import UmbrellaEmoji from "../assets/emojis/umbrella.png";
import SweatDropplesEmoji from "../assets/emojis/sweat-droplets.png";
import UmbrellaRainingEmoji from "../assets/emojis/umbrella-with-rain-drops.png";
import CloudWithRayEmoji from "../assets/emojis/cloud-with-lightning.png";
import HammerEmoji from "../assets/emojis/hammer.png";
import SnowEmoji from "../assets/emojis/snowflake.png";
import FreezeFaceEmoji from "../assets/emojis/cold-face.png";
import TornadoEmoji from "../assets/emojis/tornado.png";
import CycloneEmoji from "../assets/emojis/cyclone.png";

export function displayCurrentWeatherIcon(currentWeatherIcon) {
  switch (currentWeatherIcon) {
    case "01d":
      return <SunAlone />;
    case "01n":
      return <MoonAlone />;
    case "02d":
      return <SunWithSmallCloud />;
    case "02n":
      return <MoonWithSmallCloud />;
    case "03d":
      return <CloudWithSmallSun />;
    case "03n":
      return <CloudWithSmallMoon />;
    case "04d":
    case "04n":
      return <CloudAlone />;
    case "09d":
    case "09n":
      return <CloudWithSmallDrops />;
    case "10d":
    case "10n":
      return <CloudWithLargeDrops />;
    case "11d":
    case "11n":
      return <CloudWithRay />;
    case "13d":
    case "13n":
      return <Snow />;
    case "50d":
    case "50n":
      return <Wind />;
    default:
      console.log("Default entered");
  }
}

const SunAlone = () => {
  return (
    <div>
      You better use sun cream{" "}
      <span>
        <img
          className="random-image"
          src={SunFaceEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={SunGlassesEmoji}
          alt="sunglasses"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const MoonAlone = () => {
  return (
    <div>
      Beatiful moon right?{" "}
      <span>
        <img
          className="random-image"
          src={MoonFaceEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={SwirlkingFaceEmoji}
          alt="SwirlkingFace"
          height="20px"
          width="20px"
        />
      </span>{" "}
    </div>
  );
};

const SunWithSmallCloud = () => {
  return (
    <div>
      Perfect day{" "}
      <span>
        <img
          className="random-image"
          src={SunWithSmallCloudEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={SparklesEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const MoonWithSmallCloud = () => {
  return (
    <div>
      Perfect Night{" "}
      <span>
        <img
          className="random-image"
          src={NewMoonEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={SparklesEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudWithSmallSun = () => {
  return (
    <div>
      The clouds are coming{" "}
      <span>
        <img
          className="random-image"
          src={CloudWithSunEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={FaceScreamingEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudWithSmallMoon = () => {
  return (
    <div>
      Moon is almost invisible{" "}
      <span>
        <img
          className="random-image"
          src={LastQuarterMoonEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={FirstQuarterMoonEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudAlone = () => {
  return (
    <div>
      Not a very exciting day{" "}
      <span>
        <img
          className="random-image"
          src={CloudEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={YawningFaceEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudWithSmallDrops = () => {
  return (
    <div>
      Night could be boring{" "}
      <span>
        <img
          className="random-image"
          src={CloudSmallDropsEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={UmbrellaEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudWithLargeDrops = () => {
  return (
    <div>
      Ohh..its starting to rain{" "}
      <span>
        <img
          className="random-image"
          src={SweatDropplesEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={UmbrellaRainingEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const CloudWithRay = () => {
  return (
    <div>
      Thor are you there{" "}
      <span>
        <img
          className="random-image"
          src={CloudWithRayEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={HammerEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const Snow = () => {
  return (
    <div>
      Nice weather....For stay in home{" "}
      <span>
        <img
          className="random-image"
          src={SnowEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={FreezeFaceEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};

const Wind = () => {
  return (
    <div>
      Sandman is here{" "}
      <span>
        <img
          className="random-image"
          src={TornadoEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
        <img
          className="random-image"
          src={CycloneEmoji}
          alt="sun-face"
          height="20px"
          width="20px"
        />
      </span>
    </div>
  );
};
