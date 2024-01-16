import React from 'react'

const cartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteItem: () => {},
  increaseProductCount: () => {},
})

export default cartContext
