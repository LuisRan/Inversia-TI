// Elimina este archivo o actualiza a:
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Solo aplica a rutas API o específicas
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*', // Solo aplica a rutas API
}