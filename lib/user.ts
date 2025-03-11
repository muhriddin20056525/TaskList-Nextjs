import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./mongoose";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";

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

          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isPassEqual = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPassEqual) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error("Authorize error:", error); // Xatolikni konsolga chiqarish
          throw new Error("Internal server error"); // Xatolik tafsilotlarini frontendga yubormaslik uchun
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session({ session, token }) {
      if (token.id) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
          },
        };
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) token.id = (user as any)._id.toString();
      return token;
    },
  },
};
