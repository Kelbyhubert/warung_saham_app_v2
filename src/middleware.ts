
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "./services/auth";

export const middleware = async (req: NextRequest) => {

  console.log("\n");
  console.log(req.nextUrl.pathname);

  let token =  req.cookies.get('token')?.value || null;
  let refreshToken = req.cookies.get('refreshToken')?.value || '';
  
  console.log('Access Token : ' + token);
  console.log('Refresh Token : ' + refreshToken + "\n");

  if(token === null){
    try{
      const refreshResponse = await generateToken(refreshToken);
      const data = refreshResponse.data;
      const response = NextResponse.next();
      response.cookies.set("token",data.data.accessToken,{
        httpOnly: true,
        secure: false,
        expires: data.data.expiredDate,
        sameSite: 'strict',
        path: '/'
      });
  
      response.cookies.set("refreshToken",data.data.refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
      });
      
      return response;
    }catch(error:any){
        if(error.status !== 401){
          console.error(error)
        }
        return NextResponse.redirect(new URL("/auth/login",req.url));
      }

  }
  
}

export const config = {
  matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
}

