import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'


function Header() {
  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.headerContent }>
				<Link href="/">
					<Image
					src="/images/logo.svg" 
					alt="logo tarefator"
					width="50"
					height="50"
					/>
				</Link>
        <nav>
					<Link href="/">Home</Link>
					<Link href="/board">Minhas Tarefas</Link>
        </nav>
				<button>
					Entrar com Github
				</button>
      </div>
    </header>
  )
}

export default Header