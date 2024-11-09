import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

const todos = [
  { id: 1, text: 'Learn Next.js', completed: false },
  { id: 2, text: 'Build a todo app', completed: false },
  { id: 2, text: 'Build a todo app', completed: false },

  { id: 2, text: 'Build a todo app', completed: false },

  { id: 2, text: 'Build a todo app', completed: false },

  { id: 2, text: 'Build a todo app', completed: false },

  { id: 2, text: 'Build a todo app', completed: false },

]

function verifyToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return (error)
  }
}

export async function GET(request: Request) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const user = verifyToken(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { text } = await request.json()
  const newTodo = { id: todos.length + 1, text, completed: false }
  todos.push(newTodo)

  return NextResponse.json(newTodo)
}