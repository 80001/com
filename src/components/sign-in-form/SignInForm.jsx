import { useState } from "react"
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, singInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import Button from "../button/Button"
import FormInput from "../form-input/FormInput"
import './styles.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields


	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			await signInAuthUserWithEmailAndPassword(email, password)
			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorect password for Email')
					break
				case 'auth/user-not-found':
					alert('No user with this Email')
					break
				default:
					console.log(error)
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	const singInWithGoogle = async () => {
		const { user } = await singInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}
	return (
		<div className="sign-in-container">
			<h2>I already have an account!</h2>
			<span>
				Sign in with your email and password
			</span>
			<form onSubmit={handleSubmit}
				className="sign-form">

				<FormInput
					label='Email'
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email} />

				<FormInput
					label='Password'
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password} />

				<div className="buttons-container">
					<Button type='submit'>Sign in</Button>
					<Button type='button' buttonType='google' onClick={singInWithGoogle}>Google Sign in </Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm