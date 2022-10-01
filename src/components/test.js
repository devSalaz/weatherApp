import "./App.css";
import { useState, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import "swiper/swiper.less";

import "swiper/components/effect-coverflow/effect-coverflow.scss";
import SwiperCore from "swiper";
import { Navigation, Pagination, A11y } from "swiper";

import { EffectCoverflow } from "swiper";

import greyMatter_img from "./assets/img/grey-matter.jpg";
import kameHouse_img from "./assets/img/kame-house.jpg";
import meeseek_img from "./assets/img/meeseek.jpg";
import monster_img from "./assets/img/monster.jpg";
import psyudck_img from "./assets/img/psyduck.jpg";
import victrebeel_img from "./assets/img/victreebel.jpg";

import MainThree from "./components/MainScene";

import { FaBeer } from "react-icons/fa";

import {
  FaLinkedin,
  FaArtstation,
  FaInstagram,
  FaGithub,
  FaInfoCircle,
} from "react-icons/fa";

import {
  SiLinkedin,
  SiArtstation,
  SiGithub,
  SiInstagram,
} from "react-icons/si";

import { AiOutlineLeft } from "react-icons/ai";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { HiMenuAlt1 } from "react-icons/hi";

import { IoMdClose } from "react-icons/io";

import MainScene from "./components/MainScene";

function App() {
  SwiperCore.use([EffectCoverflow, Navigation]);

  const refContainer = useRef(null);
  const refLoadContainer = useRef(null);
  const refLoadBar = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    //console.log("loaded");
    MainThree.init(
      refContainer.current,
      refLoadContainer.current,
      refLoadBar.current
    );
    // MainThree.testFunction();
  }, []);

  const [bgState, setBgState] = useState("GM");
  const [menuState, setMenuState] = useState(false);

  const setSlide = (index) => {
    MainThree.testFunction();

    switch (index) {
      case 0:
        setBgState("GM");

        break;
      case 1:
        setBgState("KM");

        break;
      case 2:
        setBgState("MK");

        break;

      case 3:
        setBgState("MO");

        break;

      case 4:
        setBgState("PS");

        break;

      case 5:
        setBgState("VC");

        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresiÃ³n
        break;
    }

    MainThree.changeSlider(index);
    //console.log("is here");
  };
  return (
    <div className="App">
      <div ref={refLoadContainer} className="loader-container">
        <h2>Loading...</h2>
        <h4>Loading all the assets </h4>
        <div className="loading-bar">
          <div ref={refLoadBar} className="bar"></div>
        </div>
      </div>

      <div ref={refContainer} className="canvas-container"></div>
      <div
        className={
          menuState
            ? `menu-mobile  active ${bgState}`
            : `menu-mobile ${bgState}`
        }
      >
        <div className="menu-item">
          <SiLinkedin className="icon" size="1.4rem" />
          <a href="https://www.linkedin.com/in/andres-salaz/" target="_blank">
            Linkedin{" "}
          </a>
        </div>
        <div className="menu-item">
          <SiArtstation className="icon" size="1.4rem" />
          <a href="https://www.artstation.com/elsalaz" target="_blank">
            Artstation{" "}
          </a>
        </div>
        <div className="menu-item">
          <SiGithub className="icon" size="1.4rem" />
          <a href="https://github.com/devSalaz" target="_blank">
            Github{" "}
          </a>
        </div>
        <div className="menu-item">
          <SiInstagram className="icon" size="1.4rem" />
          <a href="https://www.instagram.com/el.salaz/" target="_blank">
            Instagram
          </a>
        </div>
      </div>
      <main className={bgState}>
        <nav>
          <h3>devAndres</h3>
          {menuState ? (
            <IoMdClose
              size="1.4rem"
              className="menu-icon"
              onClick={() => setMenuState(!menuState)}
            />
          ) : (
            <HiMenuAlt1
              size="1.4rem"
              className="menu-icon"
              onClick={() => setMenuState(!menuState)}
            />
          )}

          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/andres-salaz/"
                target="_blank"
              >
                <SiLinkedin size="1.4rem" className={`nav-icon ${bgState}`} />
              </a>
            </li>
            <li>
              <a href="https://www.artstation.com/elsalaz" target="_blank">
                <SiArtstation size="1.4rem" className={`nav-icon ${bgState}`} />
              </a>
            </li>
            <li>
              <a href="https://github.com/devSalaz" target="_blank">
                <SiGithub size="1.4rem" className={`nav-icon ${bgState}`} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/el.salaz/" target="_blank">
                <SiInstagram size="1.4rem" className={`nav-icon ${bgState}`} />
              </a>
            </li>
          </ul>
        </nav>
        <section>
          <div className="absolute-container">
            <div
              className={
                bgState === "GM" ? "content-model active" : "content-model"
              }
            >
              <h2>Grey Matter</h2>
              <h4>
                3D model of Grey Matter from Ben 10. This model was made in
                maya, was made for a project in the University. Can be used in
                Unity or any Game Engine, the rigging is from Mixamo. Watch in{" "}
                <span>
                  <a
                    className="link GM"
                    href="https://www.artstation.com/artwork/mDDvrE"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 14.8k
                <br></br>
                -Vertices: 7.5k
              </h4>
            </div>
            <div
              className={
                bgState === "KM" ? "content-model active" : "content-model"
              }
            >
              <h2>Kame House</h2>
              <h4>
                3D model Kame House from Dragon Ball. This model was made in
                maya, was made for a personal rendering project. Can be used in
                Unity or any Game Engine. Watch in{" "}
                <span>
                  <a
                    className="link KM"
                    href="https://www.artstation.com/artwork/Xn1kwY"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 40.4k
                <br></br>
                -Vertices: 23.1k
              </h4>
            </div>
            <div
              className={
                bgState === "MK" ? "content-model active" : "content-model"
              }
            >
              <h2>Mr Meesek</h2>
              <h4>
                3D model of Mr Meeseks from Rick and Morty. This model was made
                in maya, was made for a personal AR project. Can be used in
                Unity or any Game Engine but is too high poly, the rigging is
                from Mixamo. Watch in{" "}
                <span>
                  <a
                    className="link MK"
                    href="https://www.artstation.com/artwork/QrrwRd"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 84.5k
                <br></br>
                -Vertices: 42.6k
              </h4>
            </div>
            <div
              className={
                bgState === "MO" ? "content-model active" : "content-model"
              }
            >
              <h2>Pink Monster</h2>
              <h4>
                3D model of Monster concept found on internet. This model was
                made in maya, was made for a personal Rendering project. Can be
                used in Unity or any Game Engine. Watch in{" "}
                <span>
                  <a
                    className="link MO"
                    href="https://www.artstation.com/artwork/AqqlZ5"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 83.5k
                <br></br>
                -Vertices: 41.9k
              </h4>
            </div>
            <div
              className={
                bgState === "PS" ? "content-model active" : "content-model"
              }
            >
              <h2>Psyduck</h2>
              <h4>
                3D model of Psyduck from Pokemon. This model was made in maya,
                was made for a personal Rendering and web project. Watch in{" "}
                <span>
                  <a
                    className="link PS"
                    href="https://www.artstation.com/artwork/ZGGdKm"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 147.3k
                <br></br>
                -Vertices: 73.7k
              </h4>
            </div>
            <div
              className={
                bgState === "VC" ? "content-model active" : "content-model"
              }
            >
              <h2>Victreebel</h2>
              <h4>
                3D model of Victreebel from Pokemon. This model was made in
                maya, was made for a personal Rendering project. Can be used in
                Unity or any Game Engine. Watch in{" "}
                <span>
                  <a
                    className="link VC"
                    href="https://www.artstation.com/artwork/zOOK5L"
                    target="_blank"
                  >
                    Arstation.
                  </a>
                </span>
                <br></br>
                <br></br>
                -Tris: 11.8k
                <br></br>
                -Vertices: 6k
              </h4>
            </div>
          </div>

          <div className="container-bottom">
            <h4>
              Coding by{" "}
              <span>
                <a
                  className={`coding-text ${bgState}`}
                  href="https://www.linkedin.com/in/andres-salaz/"
                  target="_blank"
                >
                  AndrÃ©s Salazar
                </a>
              </span>
            </h4>
            <div className={"slider-container"}>
              <div ref={navigationPrevRef} className={`slide-left ${bgState}`}>
                <BiChevronLeft
                  size="1.6rem"
                  className={`icon-slider ${bgState}`}
                />
              </div>
              <div ref={navigationNextRef} className={`slide-right ${bgState}`}>
                {" "}
                <BiChevronRight
                  size="1.6rem"
                  className={`icon-slider ${bgState}`}
                />
              </div>
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow, A11y]}
                spaceBetween={0}
                slidesPerView={"auto"}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                effect={"coverflow"}
                centeredSlides={true}
                loop={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                onSlideChange={(swiper) => setSlide(swiper.realIndex)}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <img
                    className="img-slide"
                    src={greyMatter_img}
                    alt="grey-matter"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="img-slide"
                    src={kameHouse_img}
                    alt="kame-house"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="img-slide" src={meeseek_img} alt="meeseek" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="img-slide" src={monster_img} alt="monster" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="img-slide" src={psyudck_img} alt="psyduck" />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="img-slide"
                    src={victrebeel_img}
                    alt="victreebel"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            {/* <FaInfoCircle size="1.5rem" className="info-icon" /> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
