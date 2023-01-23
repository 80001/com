import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../../assets/shoping-bag.svg'
import { CartContext } from '../../../context/cart'
import './styles.scss'

const CardIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

	const toggleIsCarOpen = () => setIsCartOpen(!isCartOpen)

	//const itemCount = cartItems.map((item) => item.quantity).reduce((sum, a) => sum + a, 0)

	return (
		<div className='cart-icon-container' onClick={toggleIsCarOpen}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	)
}

export default CardIcon