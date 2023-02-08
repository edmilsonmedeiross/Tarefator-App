import Head from "next/head";
import Image from "next/image";
import styles from "../styles/styles.module.scss";

export default function Home() {
	return (
		<>
      <Head>
        <title>Tarefator App</title>
      </Head>

			<main className={ styles.contentContainer }>

				<Image
				src="/images/board-user.svg"
				alt="ferramenta board"
				width="500"
				height="500"
				/>

				<section className={ styles.callToAction }>
					<h1>Uma ferramenta para o seu dia a dia, escreva, planeje e organize-se</h1>
					<p><span>100% Gratuita</span> e online.</p>
				</section>

				<div className={ styles.donaters }>

					<Image 
					src="/images/avatar.jpg"
					alt="user vip"
					width="80"
					height="80"
					/>
					
				</div>

			</main>
		</>
	);
}
