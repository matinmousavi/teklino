import { useReducer } from 'react'
import { CartContext } from './CartContext'

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
				const updatedItems = state.items.map((item, index) => {
					if (index === existingItemIndex) {
						return { ...item, quantity: item.quantity + 1 }
					}
					return item
				})
				return { ...state, items: updatedItems }
			} else {
				return {
					...state,
					items: [...state.items, { ...action.payload, quantity: 1 }],
				}
			}
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
