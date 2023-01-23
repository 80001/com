import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { ReactComponent as Crwn } from '../../assets/crown.svg'
import './styles.scss'
import { UserContext } from '../../context/user'
import { singOutUser } from '../../utils/firebase/firebase.utils'
import CardIcon from '../card/icon/CardIcon'
import CartDrop from '../card-dropdown/CartDrop'
import { CartContext } from '../../context/cart'

const Navigation = () => {
	const { currentUser } = useContext(UserContext)

	const { isCartOpen } = useContext(CartContext)


	return (
		<Fragment>
			<div className="navigation">
				<Link className='logo-container' to='/'>
					<Crwn className='logo' />
				</Link>
				<div className="nav-links-container">
					<Link className='nav-link' to='/shop'>
						Shop
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={singOutUser}> Sign Out</span>
					)
						:
						(
							<Link className='nav-link' to='/auth'>
								Sign In
							</Link>
						)}
					<CardIcon />
				</div>
				{isCartOpen && <CartDrop />}
			</div>
			<Outlet />
		</Fragment>
	)
}

export default Navigation