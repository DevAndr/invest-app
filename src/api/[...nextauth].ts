import {NextApiRequest, NextApiResponse} from "next";
import {cookies} from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                name: "Credentials",
                credentials: {
                    email: {
                        label: "Username",
                        type: "text",
                    },
                    password: {
                        label: "Password",
                        type: "password",
                    },
                },
                async authorize(credentials, req) {
                    const response = await fetch('...', {
                        variables: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                    });
                    const data = await response.json();
                    if (response.ok && data?.token) {
                        return  data;
                    }
                    return Promise.reject(new Error(data?.errors));
                };
            })
        ],
        session: {
            strategy: "jwt",
        },
        cookies: cookies,
        callbacks: {  },
});
}