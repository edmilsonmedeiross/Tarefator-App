import Head from "next/head";
import styles from "../styles/styles.module.scss";

export default function Home() {
	return (
		<>
      <Head>
        <title>Tarefator App</title>
      </Head>
			<main>
				<div className={styles.container}>
					<h1>OI sou o Tarefator</h1>
				</div>
			</main>
		</>
	);
}
