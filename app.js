// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database'); // Povezivanje sa bazom
const userRoutes = require('./routes/userRoutes'); // Importuj user rute
const productRoutes = require('./routes/productRoutes'); // Importuj product rute
const cartRoutes = require('./routes/cartRoutes'); // Importuj cart rute

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Middleware za parsiranje JSON podataka

// Testiranje konekcije sa bazom
sequelize.authenticate()
    .then(() => {
        console.log('Povezan sa bazom podataka!');
    })
    .catch(err => {
        console.error('Nije moguće povezati se sa bazom:', err);
    });

sequelize.sync().then(() => {
    console.log('Database synchronized');
    }).catch(err => {
    console.error('Error syncing database:', err);
    });

// Korisničke rute
app.use('/api/users', userRoutes);

// Proizvodi rute
app.use('/api/products', productRoutes);

// Rute za korpu
app.use('/api/cart', cartRoutes);

// Osnovna ruta
app.get('/', (req, res) => {
    res.send('Dobrodošli u Game Merch Store API!');
});

// Pokretanje servera
app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});
