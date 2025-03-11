import { connectToDB } from "@/lib/mongoose";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and Password is required");
        }

        try {
          await connectToDB();

          const user = await UserModel.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isPassEqual = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPassEqual) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
