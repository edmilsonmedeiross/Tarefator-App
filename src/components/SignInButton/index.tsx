import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import Image from 'next/image';

function SignInButton() {

  const { data: session } = useSession()

  const myLoader = () => `${session?.user?.image}`
  
  return session ? (
    <button
    type='button'
    className={ styles.signInButton }
    onClick={ () => signOut() }
    >
			<Image
      loader={myLoader}
			src='user.image'
			alt="avatar user"
			width="35"
			height="35"
					/>
      Olá { session.user?.name }
      <FiX color='#737388' className={ styles.closeIcon } />
    </button>
  ) : (
    <button
    type='button'
    className={ styles.signInButton }
    onClick={ () => signIn('github') }
    >
      <FaGithub color='#ffb800' />
      Entrar com Github
    </button>
  )
}

export default SignInButton