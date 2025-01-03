//Rute za rad s korpom
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
 
router.post('/add', cartController.addToCart);       // Dodavanje proizvoda u korpu
router.get('/get', cartController.getCartItems);      // Dobavljanje korisničke korpe
router.put('/update', cartController.updateCart);     // Ažuriranje količine
router.delete('/remove', cartController.removeFromCart); // Uklanjanje proizvoda

module.exports = router;
