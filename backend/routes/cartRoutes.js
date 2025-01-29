//Rute za rad s korpom
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
 
router.post('/add', cartController.addToCart);       // Dodavanje proizvoda u korpu
router.get('/get', cartController.getAllCartItems);      // Dobavljanje korisničke korpe
router.put('/update', cartController.updateCartItem);     // Ažuriranje količine
router.delete('/remove', cartController.deleteCartItem); // Uklanjanje proizvoda

module.exports = router;