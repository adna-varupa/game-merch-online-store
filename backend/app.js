// app.js
const express = require('express');
require('./models');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database'); // Povezivanje sa bazom
const userRoutes = require('./routes/userRoutes'); // Importuj user rute
const productRoutes = require('./routes/productRoutes'); // Importuj product rute
const cartRoutes = require('./routes/cartRoutes'); // Importuj cart rute
const authRoutes = require('./routes/authroutes');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());  // Middleware za parsiranje JSON podataka

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

app.use('/api/auth', authRoutes);  

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
