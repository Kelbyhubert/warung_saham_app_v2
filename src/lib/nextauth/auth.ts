// import { authenticate, generateToken } from "@/services/auth";
// import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
// import credentials from "next-auth/providers/credentials";

// export const {auth,handlers,signIn,signOut} = NextAuth({
//     providers:[
//         credentials({
//             credentials:{
//                 username: {type: 'text' , name: 'username'},
//                 password: {type: 'password', name: 'password'}
//             },
//             authorize: async(credentials) => {
//                 try{
//                     const res = await authenticate(credentials.username,credentials.password);
//                     return res.data.data;
//                 }catch(error: any){
//                     // throw new CustomAuthError(
//                     //     "Invalid Credential",
//                     //     error.response?.status || 500, 
//                     //     null,
//                     //     error.response?.data.message || "UNKNOWN ERROR", 
//                     //     error.response?.data.message || "UNKNOWN ERROR"
//                     // )
//                     throw new CredentialsSignin("Test");
//                 }

//             }
//         },
//     )
//     ],
//     callbacks:{
//         async jwt({token,user}){
//             console.log("Getting JWT")
//             if(user){
//                 token.accessToken = user.token;
//                 token.refreshToken = user.refreshToken;
//                 token.expiredDate = user.expiredDate;
//             }

//             if(Date.now() > token.expiredDate){
//                 console.log("Current Time : " + Date.now());
//                 console.log("Expired Date : " + token.expiredDate);
//                 console.log("Token Expired");
                
//                 try{
//                     const res = await generateToken(token.refreshToken);
//                     token.accessToken = res.data.data.accessToken;
//                     token.refreshToken = res.data.data.refreshToken;
//                     token.expiredDate = res.data.data.expiredDate;
//                 }catch(error: any){
//                     throw new AuthError("Refresh Token Expired");
//                 }
//             }

//             return token;
//         },
//         async session({session,token}){
//             console.log("Getting Session")
//             session.accessToken = token.accessToken;
//             session.refreshToken = token.refreshToken;
//             session.expiredDate = token.expiredDate;
//             return session;
//         }
//     }
// });