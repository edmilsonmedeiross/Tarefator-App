import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/styles.module.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnections";
import { useState } from "react";

type VipUsers = {
	id: string;
	donate: boolean,
	lastDonate: Date,
	image: string
	name: string,
}

interface HomeProps {
	vipUsers: string;
}

export default function Home({ vipUsers }: HomeProps) {
	const [vips, setVips] = useState<VipUsers>(JSON.parse(vipUsers))

	return (
		<>
      <Head>
        <title>Tarefator App</title>
      </Head>

			<main className={ styles.contentContainer }>

				<Image
				src="/images/board-user.svg"
				alt="ferramenta board"
				width="400"
				height="400"
				/>

				<section className={ styles.callToAction }>
					<h1>Uma ferramenta para o seu dia a dia, escreva, planeje e organize-se</h1>
					<p><span>100% Gratuita</span> e online.</p>
				</section>

					{(
						vips.length > 0 &&
						 <h3>Apoiadores:</h3>
					)}

				<div className={ styles.donaters }>


					{vips.map(user => (
						<img key={user.id} src={user.image} alt="vip user" />
						// <Image
						// src={user.image}
						// key={user.id}
						// alt="vip user"
						// width={50}
						// height={50}
						// />
					))}
					
				</div>

			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {

	const querySnapshot = await getDocs(collection(db, "users"));
  const vipUsers = JSON.stringify(querySnapshot.docs.map(doc => {
		return {
     ...doc.data(),
		 id: doc.id,
		}
	}))
	
	return {
		props: {
			vipUsers,
		},
		revalidate: 60 * 60 
	}
}


// import { collection, getDocs } from "firebase/firestore";

