import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request){
    try {
        const { token } = await request.json();
        if(!token){
            return NextResponse.json({ isValid: false, error: 'No token provider'},{status: 400});
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        return NextResponse.json({isValid: true, decoded});
    }
    catch(error){
        return NextResponse.json({ isValid: false, error: error.message}, {status: 501});
    }
}