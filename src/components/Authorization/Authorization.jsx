
import SignUpForm from '../sign-up-form/SignUpForm';
import SignInForm from '../sign-in-form/SignInForm';
import './styles.scss'

const Authorization = () => {

	return (
		<section className="authorization-container">
			<SignInForm />
			<SignUpForm />
		</section>
	)
}

export default Authorization