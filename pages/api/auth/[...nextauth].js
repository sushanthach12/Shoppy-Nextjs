import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/User'
import SignToken from "../../../lib/siginToken";
import { signIn } from "next-auth/react";

export default NextAuth({
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            id: "credentials-login",
            async authorize(credentials, req) {
                const user = await User.findOne({ 'email': credentials.email }).select('-password')
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            checks: 'both',
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                return true
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,

    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                const TOKEN = await SignToken(user?.email);
                user.accessToken = TOKEN
            }
            return { ...token, ...user }
        },

        async session({ session, token, user }) {
            session.user = token
            return session
        }
    },
    events: {
        async signIn(message) {
            const userExists = await User.findOne({ 'email': message.user.email }).select('-password')

            if (!userExists) {
                const data = {
                    name: message.user.name,
                    email: message.user.email,
                    phoneNo: '9878675478'
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authenticate/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data })
                })
                const response = await res.json()
                this.session.user.accessToken = response.AuthToken
            }
        }
    }
})