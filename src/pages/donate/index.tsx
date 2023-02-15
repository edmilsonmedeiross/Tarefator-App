import styles from './styles.module.scss'
import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { db } from '@/services/firebaseConnections'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'

interface DonateProps {
  user:{
    name: string;
    id: string;
    image: string;
  }
}

function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  //CLIENT_ID=AQO-JoluFpasmX71Sp1Me6AdwuZwGjQamM7Jit84upF2nvffpDIn7XFrRO5fCRf-iz8zov0wFbXV0PEF
 // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

  const myLoader = () => `${user.image}`

  const handleSaveDonate = async () => {
    return await setDoc(doc(db, "users", user.id), {
      donate: true,
      name: user.name,
      image: user.image,
      lastDonate: new Date(),
    })
    .then(() => {
      setVip(true)
    })
    
  }
  
  return (
    <>
    <Head>
      <title>
        Ajude a plataforma ficar online!
      </title>
    </Head>
    <main className={styles.container}>
      <Image 
      src="/images/rocket.svg"
      alt='rocket'
      width={400}
      height={400}
      />

      {vip && (
        <div className={styles.vip}>
          <Image
          loader={myLoader}
          src="doador"
          alt='apoiador'
          width={50}
          height={50}
          />
          <span>Parabéns, você é um novo apoiador!</span>
      </div>
      )}

      <h1>Seja um apoiador desse projeto! 🏆</h1>
      <h3>Contribua com apenas <span>R$ 1,00</span></h3>
      <strong>Apareça na nossa home, tenha funcionalidades exclusivas!</strong>

      <PayPalButtons
        createOrder={ (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '1'
              }
            }]
          })
        } }

        onApprove={ (data, actions):any => {
          return actions.order?.capture().then(function(details) {
            console.log('Compra Aprovada' + details.payer.name?.given_name);
            handleSaveDonate()
            
          })
        } }
      />

    </main>
    Donate
    </>
  )
}

export default Donate

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  console.log(session.id);
  

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const user = {
    name: session?.user.name,
    id:session.id,
    image: session.user?.image
  }

  return {
    props: {
      user,
    }
  }
}