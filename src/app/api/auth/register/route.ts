import { postApi } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json()
  const resp = await postApi('auth/register', {
    name,
    email,
    password,
  })
  return NextResponse.json(resp, { status: 200 })
}
