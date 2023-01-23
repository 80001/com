import DirectoryItem from '../directory-item/DirectoryItem'
import './styles.scss'

const categories = [
	{
		id: 1,
		title: "hats",
		imageUrl: 'https://i.ibb.co/cvpntL1/men.png',
		route: 'shop/hats'
	},
	{
		id: 2,
		title: 'jackets',
		imageUrl: 'https://i.ibb.co/px2tCc3/men.png',
		route: 'shop/jackets'
	},
	{
		id: 3,
		title: 'sneakers',
		imageUrl: 'https://i.ibb.co/0jqHpnp/men.png',
		route: 'shop/sneakers'
	},
	{
		id: 4,
		title: 'womens',
		imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
		route: 'shop/womens'
	},
	{
		id: 5,
		title: 'mens',
		imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
		route: 'shop/mens'
	},
]

const Directory = () => {
	return (
		<div className="directory-container">
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	)
}
export default Directory
