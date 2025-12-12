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
				<div className="p-4 bg-red-100 border border-red-400 rounded">
					<h2 className="text-red-800 font-bold">Something went wrong</h2>
					<details className="mt-2">
						<summary className="cursor-pointer text-red-600">Error Details</summary>
						<pre className="mt-2 text-xs overflow-auto bg-red-50 p-2 rounded">
							{this.state.error && this.state.error.toString()}
						</pre>
						<pre className="mt-2 text-xs overflow-auto bg-red-50 p-2 rounded max-h-[300px]">
							{this.state.errorInfo && this.state.errorInfo.componentStack}
						</pre>
					</details>
					<button 
						className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
						onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
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
