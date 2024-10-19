import { signIn } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const logined = await signIn('credentials', {
    email,
    password,
    redirect: false, // Đảm bảo không tự động redirect khi đăng nhập
  })

  if (logined?.error) {
    return NextResponse.json({ error: logined.error }, { status: 401 })
  }

  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}
