import { postApi } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  return postApi('auth/login', {
    email,
    password,
  })
    .then(resp => NextResponse.json(resp, { status: 200 }))
    .catch(err => NextResponse.json(err, { status: err.statusCode }))
}
