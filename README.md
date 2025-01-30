Zadaća 2 (projekat 2) -2024/25 Web aplikacija - Node.js
Tema: Online Shop - Game Merch
ZIspunjenje zahtjeva projekta:
1.	Projekat kreiran sa MVC strukturom. Modeli su: User, Cart, Product. Kreirani folderi models, views, controllers radi preglednosti. Također I pomoćni fajl authConroller za prijavu I registraciju.
2.	Prikazana primjena svih metoda GET, POST, PUT, DELETE u  svakom od kontrolera (userController, cartController, productController I authController)
3.	Korišten razvojni okvir Express.js za backend, a za frontend korišten React
4.	Integrirana baza podataka sa MySQL
5.	Implementirane osnovne CRUD operacije (create, read, update, delete) za upravljanje podacima u bazi.(demonstrirano na cart-u)
6.	Napravljena forma za prijavu i registraciju i dodano heširanje šifri.
7.	Kod sadrži komentare radi razumljivosti

Upotreba:
- Prije pokretanja potrebno kreirati bazu. Moguće koristiti i skriptu za bazu i export koji se nalaze u folderu baza.
 - Podesiti podatke za konekciju sa bazom (ime,šifra i slično) u backend/config/database.js. 
- Nakon toga potrebno je otvoriti 2 konzole, jednu za frontend, drugu za backend. U prvoj konzoli uraditi “cd frontend” u drugoj “cd backend”. Nakon toga u obe uraditi “npm install”. Nakon toga pokrenuti prvo frontend pa backend sa komandom “npm start”.
- Kada se pokrene aplikacija i otvori se browser, korisniku se pojavi forma za prijavu, a ispod forme opcija za registraciju ako ne postoji profil. Kreirati profil u formi za registraciju a onda se prijaviti. Nakon uspješne prijave korisniku se otvori online shop gdje se fetchaju podaci o produktima iz baze, a u donjem desnom ćošku stoji dugme “View cart” za pregled dodanih proizvoda u korpu. Proizvodi se dodaju tako što se klikne dugme „Add to cart”. Jedan proizvod je moguće dodati više puta.
- Kada se uđe u korpu, moguće je pregledati koji su proizvodi dodani u korpu, količina proizvoda koja se može povećati ili smanjiti, i opcija za brisanje proizvoda. Također i dugme u gornjem lijevom ćošku za povratak na store page kako bi se moglo dodati još proizvoda. Na dnu View cart stranice je mock dugme za checkout.



Dodatno:
Za testiranje APIs koršten je Postman
Za komunikaciju između frontenda i backenda korišten CORS, jer je frontend runnan na portu 3000 a backend na portu 3001
Za lakše korištenje API-s, korišten Axios
Za kontrolu verzija projekat je periodično commitan na GitHub: https://github.com/adna-varupa/game-merch-online-store

