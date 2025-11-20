#  HotelMotel - System Rezerwacji Hotelowych / Hotel Booking Platform

###  **Live Demo / Wersja Live:** [https://hotel-motel-peach.vercel.app](https://hotel-motel-peach.vercel.app)


## 🇵🇱 O Projekcie (PL)

**HotelMotel** to nowoczesna, pełnoprawna aplikacja webowa typu **Full-Stack (MERN)**, umożliwiająca przeglądanie ofert hotelowych, rezerwację pokoi oraz zarządzanie obiektami przez właścicieli. Projekt łączy w sobie zaawansowane funkcje płatności, autoryzacji oraz powiadomień mailowych, oferując płynne doświadczenie zarówno dla klienta, jak i administratora.

###  Funkcjonalności

####  Dla Użytkownika:
* **Inteligentna Wyszukiwarka:** Wyszukiwanie miast z dynamicznymi podpowiedziami (oparte na **OpenStreetMap API**).
* **Zaawansowane Filtrowanie:** Sortowanie pokoi według ceny, udogodnień i lokalizacji.
* **Rezerwacje Online:** Interaktywny wybór dat zameldowania/wymeldowania i liczby gości.
* **Bezpieczne Płatności:** Integracja z bramką płatności **Stripe**. (testmode więć aby zapłacić mozna wpisac numer karty **4242 4242 4242 4242**, losowe cvc i datę w przyszłości)
* **Panel Klienta:** Historia rezerwacji ("Moje rezerwacje") z możliwością ich anulowania.
* **Powiadomienia:** Automatyczne potwierdzenia mailowe wysyłane przez **Nodemailer**.

####  Dla Właściciela (Panel Administratora):
* **Dodawanie Pokoi:** Rozbudowany formularz z przesyłaniem zdjęć wprost do chmury (**Cloudinary**).
* **Zarządzanie Ofertą:** Edycja dostępności pokoi, usuwanie nieaktualnych ofert.
* **Dashboard:** Statystyki zarobków, lista ostatnich rezerwacji i statusy płatności.

####  Technologie i Bezpieczeństwo:
* **Autoryzacja:** Bezpieczne logowanie i rejestracja obsługiwane przez **Clerk**.
* **Backend:** Zabezpieczone endpointy API (weryfikacja tokenów).

---

## 🇬🇧 About the Project (EN)

**HotelMotel** is a modern, full-stack web application (MERN) designed for browsing hotel offers, booking rooms, and managing properties. The project integrates advanced features such as secure payments, real-time authentication, and automated email notifications, providing a seamless experience for both users and administrators.

###  Key Features

####  For Users:
* **Smart Search:** Intelligent city search with auto-suggestions based on **OpenStreetMap API**.
* **Filtering:** Advanced sorting by price, amenities, and location.
* **Online Bookings:** Interactive date selection and guest management.
* **Secure Payments:** Transactions powered by **Stripe**. (it is in testmode so to pay you can enter this card number **4242 4242 4242 4242**, random cvc, and future date)
* **User Dashboard:** View booking history and cancel reservations via "My Bookings".
* **Notifications:** Automated email confirmations via **Nodemailer**.

####  For Hotel Owners (Admin Panel):
* **Room Management:** Add new rooms with seamless image uploads via **Cloudinary**.
* **Control Panel:** Edit room availability and delete offers.
* **Dashboard:** Analytics on revenue, recent bookings, and payment statuses.

####  Tech & Security:
* **Authentication:** Secure login and registration handled by **Clerk**.
* **Backend Security:** Protected API endpoints using token verification.

---

##  Tech Stack (Technologie)

### Frontend:
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js** (Vite)
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**
* **Axios** & **Context API**

### Backend:
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**
* ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) **Express.js**
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB & Mongoose**

### Services & Tools:
*  **Stripe** (Payments / Płatności)
*  **Clerk** (Auth / Autoryzacja)
*  **Cloudinary** (Image Hosting / Zdjęcia)
*  **Nodemailer** (Email Service / Maile)
*  **Nominatim API** (Geolocation / Mapy)

---

## 📸 Gallery / Galeria

| Home Page | Rooms List |
|:---:|:---:|
| ![Home](<img width="400" height="200" alt="h1" src="https://github.com/user-attachments/assets/53f2a8c1-7dd6-4ded-93d0-335c3c2fd433" />
) | ![Rooms](https://via.placeholder.com/400x200?text=Rooms+List) |

| Owner Dashboard | Booking History |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard) | ![Bookings](https://via.placeholder.com/400x200?text=My+Bookings) |

---

## 📬 Contact / Kontakt

Created by **Szymon Jaworski**.
GitHub: [SzymonJawors](https://github.com/SzymonJawors)
