import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../../context/categories'
import ProductCard from '../../product-card/Product-Card'
import './styles.scss'

const Category = () => {
	const { category } = useParams()
	const { categoriesMap } = useContext(CategoriesContext)
	const [products, setProducts] = useState(categoriesMap[category])

	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])
	return (
		<Fragment>
			<h2 className='category-title'>{category}</h2>
			<div className='category-container'>
				{products &&
					products.map((product) => <ProductCard key={product.id} product={product} />)
				}
			</div>
		</Fragment>
	)
}

export default Category