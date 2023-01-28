import { createAction } from '../utils/reduces/reducer.utils'
import { useReducer } from "react";
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
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
	setIsCartOpen: () => { },
	addItemToCard: () => { },
	removeItemToCart: () => { },
	deleteItemToCart: () => { },
})

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
}

const cartReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			}
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			}
		default:
			throw new Error(`unhandled type of ${type} in cartTeducer`)
	}
}

export const CartProvider = ({ children }) => {
	const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
	const updateCartItemsReduser = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity, 0)
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
				{
					cartItems: newCartItems,
					cartCount: newCartCount,
					cartTotal: newCartTotal
				})

		)
	}
	const addItemToCard = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd)
		updateCartItemsReduser(newCartItems)
	}

	const removeItemToCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove)
		updateCartItemsReduser(newCartItems)
	}

	const deleteItemToCart = (cartItemToDelete) => {
		const newCartItems = deleteCartItem(cartItems, cartItemToDelete)
		updateCartItemsReduser(newCartItems)
	}


	const setIsCartOpen = (bool) => {
		dispatch(
			createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
		)
	}
	const value = { isCartOpen, setIsCartOpen, addItemToCard, cartItems, cartCount, removeItemToCart, deleteItemToCart, cartTotal }
	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}