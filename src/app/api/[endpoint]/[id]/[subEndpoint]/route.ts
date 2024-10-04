import { getApi, postApi } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  params: { endpoint: string; id: string; subEndpoint: string }
}

export async function GET(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint } = params

  const resp = await getApi(`${endpoint}/${id}/${subEndpoint}`)

  return NextResponse.json(resp, { status: 200 })
}

export async function POST(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint } = params

  const body = await request.json()

  const resp = await postApi(`${endpoint}/${id}/${subEndpoint}`, id, body)

  return NextResponse.json(resp, { status: 201 })
}
