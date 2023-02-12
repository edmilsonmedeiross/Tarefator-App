import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_CLIENT_ID = '', GITHUB_CLIENT_SECRET = ''} = process.env;



export const authOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    session: async ({session, user}) => {   

      try {
        return {
          ...session,
          id: user.id
        }
      } catch {
        return {
          ...session,
          id: null
        }
      }
    },
    async signIn({ user }) {
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