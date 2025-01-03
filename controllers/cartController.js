const { Cart, User, Product } = require('../models');

exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const user = await User.findByPk(user_id);
    const product = await Product.findByPk(product_id);

    if (!user || !product) {
      return res.status(404).json({ error: 'User or product not found.' });
  

    }

    // Check if the item is already in the cart
    const existingCartItem = await Cart.findOne({
      where: {
        user_id,
        product_id
      }
    });

    if (existingCartItem) {
      // If the item exists, just update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart item updated successfully!', cartItem: existingCartItem });
    } else {
      // If the item doesn't exist, create a new cart item
      const cartItem = await Cart.create({
        user_id,
        product_id,
        quantity
      });
      return res.status(201).json({ message: 'Item added to cart successfully!', cartItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Greška prilikom dodavanja u korpu.' });
  }
};

exports.getCartItems = async (req, res) => {
    try {
      // Logic to get cart items, e.g., from the database
      const cartItems = await Cart.findAll({
        where: {
          userId: req.userId, // assuming you have userId as part of the request
        },
        include: [Product], // Include related products if necessary
      });
  
      if (!cartItems) {
        return res.status(404).json({ message: 'No items found in cart' });
      }
  
      return res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
  };

  exports.updateCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  
    try {
      // Find the cart item to update
      const cartItem = await Cart.findOne({
        where: {
          user_id,
          product_id,
        },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      // Update the cart item with the new quantity
      cartItem.quantity = quantity;
      await cartItem.save();
  
      return res.status(200).json({ message: 'Cart item updated successfully!', cartItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while updating the cart item' });
    }
  };

  exports.removeFromCart = async (req, res) => {
    const { user_id, product_id } = req.params;
  
    try {
      // Find and delete the cart item
      const cartItem = await Cart.findOne({
        where: {
          user_id,
          product_id,
        },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      // Delete the cart item
      await cartItem.destroy();
  
      return res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while removing the cart item' });
    }
  };
