import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from "@/services/firebaseConnections";

const { GITHUB_CLIENT_ID = '', GITHUB_CLIENT_SECRET = ''} = process.env;



export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    session: async ({session, token}: any) => {   

      try {
        const docRef = doc(db, "users", token.sub);
        const docSnap = await(await getDoc(docRef).then((snapShot) => {

          if (snapShot.exists()) {
            return snapShot.data().lastDonate.toDate();
          } else {
            return null;
          }

        }))
  

        console.log(docSnap);
        
        
        return {
          ...session,
          id: token.sub,
          vip: docSnap ? true : false,
          lastDonate: docSnap,
        }
      } catch {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
        }
      }
    },
    async signIn({ user }: any) {
      const { email } = user;
      //console.log(email);
      
      try {
        return true;
      } catch(err) {
        console.log('DEU ERRO', err);
        return false;
      }
    }
  }
}

export default NextAuth(authOptions)