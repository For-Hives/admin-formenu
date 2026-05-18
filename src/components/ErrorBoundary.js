'use client'

import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null, errorInfo: null }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.error('🔴 ErrorBoundary caught an error:', error)
		console.error('🔴 Component Stack:', errorInfo.componentStack)
		this.setState({ error, errorInfo })
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="rounded border border-red-400 bg-red-100 p-4">
					<h2 className="font-bold text-red-800">Something went wrong</h2>
					<details className="mt-2">
						<summary className="cursor-pointer text-red-600">
							Error Details
						</summary>
						<pre className="mt-2 overflow-auto rounded bg-red-50 p-2 text-xs">
							{this.state.error && this.state.error.toString()}
						</pre>
						<pre className="mt-2 max-h-[300px] overflow-auto rounded bg-red-50 p-2 text-xs">
							{this.state.errorInfo && this.state.errorInfo.componentStack}
						</pre>
					</details>
					<button
						className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
						onClick={() =>
							this.setState({ hasError: false, error: null, errorInfo: null })
						}
					>
						Réessayer
					</button>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
