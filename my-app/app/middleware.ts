import { console } from "inspector";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log(req.nextUrl);
    const res = NextResponse.next();
    res.headers.append('Access-Control-Allow-Origin', "true")
    res.headers.append('Access-Control-Allow-Origin','*')
    res.headers.append('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    res.headers.append('Access-Control-Allow-Headers','Content-Type, Accept, Accept-Version,X-CSRF-Token')

return res;
}

export const config = {
    matcher: ['/api/:path*'],
}