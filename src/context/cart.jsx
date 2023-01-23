import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	)
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}


const deleteCartItem = (cartItems, cartItemToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id)
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => { },
	cartItems: [],
	addItemToCard: () => { },
	removeItemToCart: () => { },
	deleteItemToCart: () => { },
	cartCount: 0,
	priceCount: 0,
})

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [priceCount, setPriceCount] = useState(0)
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setCartCount(newCartCount)
	}, [cartItems])
	useEffect(() => {
		const newPriceCount = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)
		setPriceCount(newPriceCount)
	}, [cartItems])

	const addItemToCard = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}

	const removeItemToCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}

	const deleteItemToCart = (cartItemToDelete) => {
		setCartItems(deleteCartItem(cartItems, cartItemToDelete))
	}

	const value = { isCartOpen, setIsCartOpen, addItemToCard, cartItems, cartCount, removeItemToCart, deleteItemToCart, priceCount }
	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}