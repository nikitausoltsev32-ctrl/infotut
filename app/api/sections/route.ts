import { NextResponse } from 'next/server'
import { SECTIONS } from '@/lib/mock-data'

export async function GET() {
  return NextResponse.json({ sections: SECTIONS })
}
