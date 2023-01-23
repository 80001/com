import { useNavigate } from 'react-router-dom'
import ProductCard from '../product-card/Product-Card'
import './styles.scss'

const CategoryPreview = ({ title, products }) => {
	const navigate = useNavigate()
	const goToCategory = () => {
		navigate(`./${title}`)
	}
	return (
		<div className='category-preview-container'>
			<h2>
				<span className='title' onClick={goToCategory}>{title.toUpperCase()}</span>
			</h2>
			<div className="preview">
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				}
			</div>
		</div>
	)
}

export default CategoryPreview