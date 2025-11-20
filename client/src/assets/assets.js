import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import seaIcon from './seaIcon.svg'
import cityIcon from './cityIcon.svg'
import gymIcon from './gymIcon.svg'
import acIcon from './acIcon.svg'
import bathIcon from './bathIcon.svg'
import tvIcon from './tvIcon.svg'
import minibarIcon from './minibarIcon.svg'
import balconyIcon from './balconyIcon.svg'
import kitchenIcon from './kitchenIcon.svg'
import parkingIcon from './parkingIcon.svg'
import petIcon from './petIcon.svg'
import disabledIcon from './disabledIcon.svg'
import coffeeIcon from './coffeeIcon.svg'

export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    seaIcon,
    cityIcon,
    gymIcon,
    acIcon,
    bathIcon,
    tvIcon,
    minibarIcon,
    balconyIcon,
    kitchenIcon,
    parkingIcon,
    petIcon,
    disabledIcon,
    coffeeIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];

export const exclusiveOffers = [
    { _id: 1, title: "Letni Pakiet Wypoczynkowy", description: "Ciesz się darmową nocą i codziennym śniadaniem", priceOff: 25, expiryDate: "31 Sie", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantyczny Wypad", description: "Specjalny pakiet dla par, w tym zabieg spa", priceOff: 20, expiryDate: "20 Wrz", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luksusowy Wypoczynek", description: "Rezerwuj 60 dni wcześniej i oszczędzaj na pobycie w naszych luksusowych obiektach na całym świecie.", priceOff: 30, expiryDate: "25 Wrz", image: exclusiveOfferCardImg3 },
]

export const testimonials = [
    { id: 1, name: "Adam Kowalski", address: "Kraków, Polska", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Korzystałem z wielu platform rezerwacyjnych, ale żadna nie dorównuje spersonalizowanemu doświadczeniu i dbałości o szczegóły, jakie oferuje HotelMotel." },
    { id: 2, name: "Liam Johnson", address: "Nowy Jork, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "HotelMotel przerosło moje oczekiwania. Proces rezerwacji był prosty, a hotele — absolutnie najwyższej klasy. Bardzo polecam!" },
    { id: 3, name: "Maria Nowak", address: "Warszawa, Polska", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Niesamowita obsługa! Zawsze znajduję najlepsze luksusowe noclegi dzięki HotelMotel. Ich rekomendacje nigdy nie zawodzą!" }
];

export const facilityIcons = {
    "Darmowe WiFi": assets.freeWifiIcon,
    "Darmowe śniadania": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Widok na góry": assets.mountainIcon,
    "Dostęp do basenu": assets.poolIcon,
    "Widok na morze": assets.seaIcon,
    "Widok na miasto": assets.cityIcon,
    "Siłownia / Fitness": assets.gymIcon,
    "Klimatyzacja": assets.acIcon,
    "Prywatna łazienka": assets.bathIcon,
    "Telewizor Smart TV": assets.tvIcon,
    "Minibar": assets.minibarIcon,
    "Balkon / Taras": assets.balconyIcon,
    "Aneks kuchenny": assets.kitchenIcon,
    "Miejsce parkingowe": assets.parkingIcon,
    "Przyjazny zwierzętom": assets.petIcon,
    "Udogodnienia dla niepełnosprawnych": assets.disabledIcon,
    "Ekspres do kawy": assets.coffeeIcon,
};

export const roomCommonData = [
    { icon: assets.homeIcon, title: "Czysty i Bezpieczny Pobyt", description: "Dobrze utrzymana i higieniczna przestrzeń tylko dla Ciebie." },
    { icon: assets.badgeIcon, title: "Zwiększone Standardy Czystości", description: "Ten gospodarz przestrzega rygorystycznych zasad czystości Staybnb." },
    { icon: assets.locationFilledIcon, title: "Doskonała Lokalizacja", description: "90% gości oceniło lokalizację na 5 gwiazdek." },
    { icon: assets.heartIcon, title: "Płynny Check-In", description: "100% gości oceniło proces zameldowania na 5 gwiazdek." },
];