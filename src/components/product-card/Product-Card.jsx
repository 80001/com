import { useContext } from 'react'
import { CartContext } from '../../context/cart'
import Button from '../button/Button'
import './styles.scss'


const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product
	const { addItemToCard } = useContext(CartContext)
	const addProductToCart = () => addItemToCard(product)
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">$ {price}</span>
				<Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>
			</div>
		</div>)
}

export default ProductCard