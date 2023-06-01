import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  onClickCartItemDash: () => {},
  onClickCartItemPlus: () => {},
  addCartItem: () => {},
  isLoading: false,
  orderPlaced: false,
  onClickOrder: () => {},
  onClickGoHome: () => {},
})
export default CartContext
