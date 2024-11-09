import { prisma } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const reqBody: LoginRequest = await req.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findFirst({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true,
        },
    });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const tokenData = {
        id: user.id,
        email: user.email,
        
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '10h' }); // Set an expiration time for the token

    const response = NextResponse.json({
        message: "Login successful",
        user: { id: user.id, email: user.email },
        token,
    });

    // Set cookie
    response.cookies.set("token", token, {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
        path: "/", // Cookie is available across the entire site
        maxAge: 60 * 60, // 1 hour
    });

    return response;
}
