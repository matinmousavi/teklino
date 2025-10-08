/* eslint-disable react-refresh/only-export-components */

import { createContext, useReducer, useContext } from 'react'

export const CartContext = createContext()

const initialState = {
	items: [],
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const existingItemIndex = state.items.findIndex(
				item => item.id === action.payload.id
			)
			if (existingItemIndex > -1) {
				const updatedItems = state.items.map((item, index) =>
					index === existingItemIndex
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
				return { ...state, items: updatedItems }
			} else {
				return {
					...state,
					items: [...state.items, { ...action.payload, quantity: 1 }],
				}
			}
		}
		case 'REMOVE_FROM_CART': {
			const updatedItems = state.items.filter(
				item => item.id !== action.payload.id
			)
			return { ...state, items: updatedItems }
		}
		case 'UPDATE_QUANTITY': {
			const updatedItems = state.items
				.map(item => {
					if (item.id === action.payload.id) {
						const newQuantity = Math.max(1, action.payload.quantity)
						return { ...item, quantity: newQuantity }
					}
					return item
				})
				.filter(item => item.quantity > 0)
			return { ...state, items: updatedItems }
		}
		default:
			return state
	}
}

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
