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
