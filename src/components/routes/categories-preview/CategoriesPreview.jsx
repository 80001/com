import { useContext } from 'react'
import { CategoriesContext } from '../../../context/categories'
import CategoryPreview from '../../category-preview/CategoryPreview'

const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext)

	return (
		<div>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title]
				return <CategoryPreview key={title} title={title} products={products} />
			})
			}
		</div>
	)
}

export default CategoriesPreview