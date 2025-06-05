import DBConnection from "@/librabry/mongodb";
import UserModel from "@/models/user";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          await DBConnection();
          let user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  secret: process.env.SECRET_KEY,
  pages: {
    signIn: "/login",
  },
});
