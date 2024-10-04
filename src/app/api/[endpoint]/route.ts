import { getApi, postApi } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  params: { endpoint: string }
}

export async function GET(request: NextRequest, { params }: IParams) {
  const { endpoint } = params

  const resp = await getApi(endpoint)

  return NextResponse.json(resp, { status: 200 })
}

export async function POST(request: NextRequest, { params }: IParams) {
  const { endpoint } = params

  const body = await request.json()

  const resp = await postApi(endpoint, body)

  return NextResponse.json(resp, { status: 201 })
}
