import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  GET_TOTAL_AMOUNT,
} from '../constants';

const initalState = {
  items: [],
  totalAmount: 0,
};

const cartItems = (state = initalState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const existingProduct = state.items.find((item) => item._id === addedProduct._id);
      let updatedProduct;

      if (!existingProduct) {
        updatedProduct = {
          _id: addedProduct._id,
          price: addedProduct.price,
          quantity: 1,
          name: addedProduct.name,
          totalAmount: addedProduct.price,
          imageCover: addedProduct.imageCover,
        };
      } else {
        existingProduct.quantity = existingProduct.quantity + 1;
        existingProduct.totalAmount = existingProduct.price * existingProduct.quantity;
        return {
          ...state,
        };
      }

      return {
        ...state,
        items: [...state.items, updatedProduct],
      };

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);

    case INCREASE_QUANTITY:
      const productIncease = action.payload;
      const productExist = state.items.find((item) => item._id === productIncease._id);
      productExist.quantity = productExist.quantity + 1;
      productExist.totalAmount = productExist.price * productExist.quantity;

      return {
        ...state,
      };
    case DECREASE_QUANTITY:
      const productDecease = action.payload;
      const productExistDe = state.items.find((item) => item._id === productDecease._id);
      productExistDe.quantity = productExistDe.quantity - 1;
      productExistDe.totalAmount = productExistDe.price * productExistDe.quantity;

      if (productExistDe.quantity === 0) {
        const products = state.items.filter((item) => item._id !== productExistDe._id);
        console.log(products);
        return {
          items: [...products],
        };
      }
      return {
        ...state,
      };
    case GET_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: state.items.reduce((totalAmount, item) => totalAmount + item.totalAmount, 0),
      };
    case CLEAR_CART:
      return {
        items: [],
        totalAmount: 0,
      };
  }
  return state;
};

export default cartItems;
