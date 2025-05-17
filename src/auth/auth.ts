/** 
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  accessToken: string;
  refreshToken: string;
  role: string;
  email: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Add custom user properties to the token if a user is provided
      if (user) {
        token.accessToken = (user as User).accessToken;
        token.refreshToken = (user as User).refreshToken;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Define a type that includes the custom properties
      type CustomUserSession = typeof session.user & {
        accessToken: string;
        refreshToken: string;
        role: string;
      };

      // Merge existing session.user with new properties using Object.assign
      session.user = Object.assign(session.user || {}, {
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        role: token.role as string,
      }) as CustomUserSession;

      return session;
    },
  },
});

**/
