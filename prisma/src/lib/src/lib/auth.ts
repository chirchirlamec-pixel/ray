import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {

        if (!credentials?.email) {
          return null;
        }

        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

        if (!user) {
          return null;
        }

        const validPassword =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!validPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          balance: user.balance,
          totalEarned: user.totalEarned
        };
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET,
};
