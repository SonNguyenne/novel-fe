import { deleteOne, getOne, patchOne, postOne } from '@/lib'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  params: { endpoint: string; id: string; subEndpoint: string; subId: string }
}

export async function GET(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint, subId } = params
  const resp = await getOne(`${endpoint}/${id}/${subEndpoint}`, subId)

  return NextResponse.json(resp, { status: 200 })
}

export async function POST(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint, subId } = params

  const body = await request.json()

  const resp = await postOne(`${endpoint}/${id}/${subEndpoint}`, subId, body)

  return NextResponse.json(resp, { status: 201 })
}

export async function PATCH(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint, subId } = params

  const body = await request.json()

  const resp = await patchOne(`${endpoint}/${id}/${subEndpoint}`, subId, body)

  return NextResponse.json(resp, { status: 200 })
}

export async function DELETE(request: NextRequest, { params }: IParams) {
  const { endpoint, id, subEndpoint, subId } = params

  await deleteOne(`${endpoint}/${id}/${subEndpoint}`, subId)

  return NextResponse.json({}, { status: 204 })
}
