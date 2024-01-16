import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import cartContext from './context/cartContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    cartList: [
      {
        title: 'Product 1',
        brand: 'Brand Name',
        id: 1001,
        imageUrl:
          'https://assets.ccbp.in/frontend/react-js/sample-product-img.jpg',
        price: 760,
        quantity: 5,
      },
    ],
  }

  isProductInCart = (cartList, ProductId) =>
    cartList.some(product => product.id === ProductId)

  addCartItem = product => {
    const {cartList} = this.state
    if (this.isProductInCart(cartList, product.id)) {
      //   console.log('Condition1')
      const NewQuantity = product.quantity
      console.log(NewQuantity)
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + NewQuantity}
            : item,
        ),
      }))
    } else {
      //   console.log('Second Running')
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  increaseProductCount = (cartItemDetails, CountItem) => {
    console.log(cartItemDetails)
    console.log(CountItem)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === cartItemDetails.id
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <cartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            increaseProductCount: this.increaseProductCount,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </cartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
