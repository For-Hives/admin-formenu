// /middleware.js
export { default } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
	const session = await getToken({ req, secret })

	if (!session) {
		const url = req.nextUrl.clone()
		url.pathname = '/auth/signin'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

// Exclude auth pages, API routes, and static assets from middleware
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - /auth/* (authentication pages)
		 * - /api/* (API routes including NextAuth)
		 * - /_next/* (Next.js internals)
		 * - /favicon.ico, /assets/* (static files)
		 */
		'/((?!auth|api|_next|favicon.ico|assets).*)',
	],
}
