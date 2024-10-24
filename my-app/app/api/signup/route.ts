import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import bcrypt from "bcrypt"
export async function GET() {
    return NextResponse.json({
        message: "Hello World"
    })
}

export async function POST(req: NextRequest){

    const reqBody = await req.json()

    const { email, password} = reqBody;

    const usernameExists = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    if(usernameExists){
        return NextResponse.json({
            message: "Username already exists"
        })
    };
        // const salt = await bcrypt.gensalt(10)
     const hashpassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashpassword
        }
    });

    return NextResponse.json({
        success: true,
        message: "Account created",
        data: {
            user: newUser,
        },
    });


}