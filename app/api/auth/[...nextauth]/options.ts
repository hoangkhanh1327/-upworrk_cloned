import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import ApiService from '@/app/services/ApiService';
import { login } from '@/app/services/authentication.services';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (credentials) {
                    const res = await login(credentials);
                    console.log('res khanhhhhhhhhhhhhhhhh', res);
                    if (res.data) {
                        return res.data;
                    }
                }
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/dang-nhap',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                };
            }

            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
};
