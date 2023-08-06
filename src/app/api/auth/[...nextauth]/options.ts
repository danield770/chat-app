import { prisma } from '@/lib/prisma';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'Username:',
          type: 'text',
        },
        email: {
          label: 'Email:',
          type: 'email',
        },
      },
      async authorize(credentials) {
        // DOCS: https://next-auth.js.org/configuration/providers/credentials

        console.log({ credentials });
        if (!credentials?.name || !credentials?.email) {
          return null;
        }
        console.log('==========================');

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log({ user });
        if (user) {
          if (user.name === credentials.name) {
            return user;
          } else {
            return null;
          }
        }
        console.log('this is a new user!');

        try {
          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              role: credentials.email.includes('permit.io') ? 'admin' : 'user',
            },
          });

          console.log('....we have a new user....');

          console.log({ newUser });
          if (newUser) {
            return newUser;
          }
        } catch (err) {
          console.log(err);
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;

      return session;
    },
    redirect() {
      return '/chat';
    },
  },
};
