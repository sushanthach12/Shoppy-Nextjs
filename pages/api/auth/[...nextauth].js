import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import jwt from 'jsonwebtoken';

export default NextAuth({
    providers: [
        GoogleProvider({
            checks: 'state',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,

    callbacks: {
        // async signIn({ user, account, profile }) {
        //     const res = await fetch("/api/authenticate/login", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email: profile.email })
        //     });

        //     const response = await res.json()

        //     if (response && response.Success?.value === true) {
        //         return true;
        //     } else {
        //         const data = {
        //             name: profile.name,
        //             email: profile.email,
        //             phoneNo: '9878675478'
        //         };
        //         const res = await fetch("/api/authenticate/login", {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ data: data })
        //         })
        //         return true;
        //     }
        // },

        async jwt({ token, user, account }) {
            // if (account) {
            //     const token = await SignToken(user?.email);
            //     token.accessToken = token
            // }
            return { ...token, ...user }
        },

        async session({ session, token, user }) {
            session.user = token
            return session
        }
    }
})