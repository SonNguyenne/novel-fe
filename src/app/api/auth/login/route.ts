import { signIn } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  return await signIn('credentials', {
    email,
    password,
  })
    .then(resp => NextResponse.json(resp, { status: 200 }))
    .catch(err => NextResponse.json(err, { status: err.statusCode }))
}
