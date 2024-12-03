// import NextAuth from "next-auth"
// import { User as NextAuthUser } from 'next-auth';
// import { JWT } from "next-auth/jwt";

// declare module "next-auth"{
//     interface User extends NextAuthUser {
//         token: string,
//         refreshToken: string
//         expiredDate: any
//     }

//     interface Session {
//         accessToken?: string
//         refreshToken?: string
//         expiredDate?: any
//     }
// }

// declare module "next-auth/jwt"{
//     interface JWT {
//         accessToken?: string
//         refreshToken?: string
//         expiredDate?: any
//       }
// }