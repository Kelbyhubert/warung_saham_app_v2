import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from 'iron-session';

export interface session {
  token: string
  refreshToken: string
}

const cookieOptions = {
    httpOnly: true,  // Secure cookie
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',  // Path where cookie is available
  }


export const sessionConfig : SessionOptions = {
  password: "dhdaiojdhajsdjiaksdajdkasjsidjahdjhsdhuaskdakhjhdalkjskdashdlasjiudahk",
  cookieName: "Session",
  cookieOptions :{
    secure: false
  }
}

export const createSession = async (token : string,tokenExpiredDate: number, refreshToken : string) => {
  const session = await getIronSession<session>(await cookies(),sessionConfig);
  session.token = token;
  session.refreshToken = refreshToken;
  console.log("Create Session Token : " +  session.token);
  await session.save();

  return session;
}

export const createSessionV1 = async (token : string,tokenExpiredDate: number, refreshToken : string) => {
  (await cookies()).set('token', token, {
    httpOnly: true,  // Secure cookie
    secure: false,
    expires : tokenExpiredDate,
    sameSite: 'strict',
    path: '/',  // Path where cookie is available
  });

  (await cookies()).set('refreshToken', refreshToken, {
    httpOnly: true,  // Secure cookie
    secure: false,
    sameSite: 'strict',
    path: '/',  // Path where cookie is available
  });

  // console.log(tokenExpiredDate);
  // console.log( "Date " + new Date(tokenExpiredDate));

  // setCookie('token',token,{
  //   httpOnly: true,
  //   secure: false,
  //   expires: new Date(tokenExpiredDate),
  //   sameSite: 'lax',
  //   path: '/'
  
  // });

  // setCookie('refreshToken',refreshToken,{
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: 'lax',
  //   path: '/'
  // });

}

export const getSession = async() => {
  const session = await getIronSession<session>(await cookies(),sessionConfig);
  console.log("Get Session Token : " +  session.token);
  return session;
}