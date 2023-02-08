import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import Image from 'next/image';

function SignInButton() {

const session = true;

  return session ? (
    <button
    type='button'
    className={ styles.signInButton }
    onClick={ () => {} }
    >
			<Image
			src="/images/avatar.jpg"
			alt="avatar user"
			width="35"
			height="35"
					/>
      Olá Edmilson
      <FiX color='#737388' className={ styles.closeIcon } />
    </button>
  ) : (
    <button
    type='button'
    className={ styles.signInButton }
    onClick={ () => {} }
    >
      <FaGithub color='#ffb800' />
      Entrar com Github
    </button>
  )
}

export default SignInButton