import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/cart'
import Button from '../button/Button'
import CartItem from '../cart-item/CartItem'
import './styles.scss'

const CartDrop = () => {
	const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext)
	const navigate = useNavigate()
	const goToCheckout = () => {
		navigate('/checkout')
		const toggleIsCarOpen = () => setIsCartOpen(!isCartOpen)
		toggleIsCarOpen()
	}
	return (
		<div className='cart-dropdown-container'>
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckout}>Go to checkout</Button>
		</div>
	)
}

export default CartDrop