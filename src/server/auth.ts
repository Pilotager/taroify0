import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './database/schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
