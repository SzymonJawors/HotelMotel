import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <img
            src={assets.logo}
            alt="logo"
            className="mb-4 h-8 md:h-9 invert opacity-80"
          />
          <p className="text-sm">
            Odkryj najbardziej niezwykłe miejsca na świecie,
            w których możesz się zatrzymać — od butikowych
            hoteli po luksusowe wille i prywatne wyspy.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img
              src={assets.instagramIcon}
              alt="insta"
              className="w-6"
            />
            <img
              src={assets.facebookIcon}
              alt="fb"
              className="w-6"
            />
            <img
              src={assets.twitterIcon}
              alt="x"
              className="w-6"
            />
            <img
              src={assets.linkendinIcon}
              alt="linkedin"
              className="w-6"
            />
          </div>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">HotelMotel</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">O nas</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Kariera</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Prasa</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Blog</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Patnerzy</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800">Wsparcie</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Centrum Pomocy</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Informacje o bezpieczeństwie</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Opcje rezygnacji</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Skontaktuj się z nami</a>
            </li>
            <li>
              <a target="_blank" href="https://www.szymonjaworski.dev">Dostępność</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800">
            Bądź na bieżąco
          </p>
          <p className="mt-3 text-sm">
           Zapisz się do naszego newslettera, aby czerpać inspiracje i otrzymywać specjalne oferty.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Twój e-mail"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r">
                <img src={assets.arrowIcon} alt="arrowico" className="w-3.5 invert"/>
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://www.szymonjaworski.dev">HotelMotel</a>.
          Wszystkie prawa zastrzeżone.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a target="_blank" href="https://www.szymonjaworski.dev">Polityka prywatności</a>
          </li>
          <li>
            <a target="_blank" href="https://www.szymonjaworski.dev">Regulamin</a>
          </li>
          <li>
            <a target="_blank" href="https://www.szymonjaworski.dev">Mapa strony</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
