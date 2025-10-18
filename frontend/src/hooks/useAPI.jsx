/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, useRef, createContext } from 'react'

const APIContext = createContext({})

export function APIProvider({ children }) {
	return <APIContext.Provider value={{}}>{children}</APIContext.Provider>
}

export default function useAPI() {
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [request, setRequest] = useState(null)
	const lastRequestRef = useRef({})
	const callsRef = useRef(0)

	function buildQueryString(params) {
		if (
			!params ||
			typeof params !== 'object' ||
			Object.keys(params).length === 0
		) {
			return ''
		}
		const query = Object.entries(params)
			.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
			.join('&')
		return `?${query}`
	}

	async function getAPI({
		requestUrl,
		method = 'GET',
		setState = true,
		params,
		signal,
	}) {
		const requestInit = {
			method,
			headers: {},
			credentials: 'include',
			signal,
		}
		let finalUrl = `/api${requestUrl}`

		if (method === 'GET') {
			const querystring = buildQueryString(params)
			finalUrl += querystring
		} else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
			if (params instanceof FormData) {
				requestInit.body = params
			} else {
				requestInit.headers['Content-Type'] = 'application/json'
				requestInit.body = JSON.stringify(params)
			}
		}

		if (callsRef.current === 0) setLoading(true)
		callsRef.current++

		try {
			const response = await fetch(finalUrl, requestInit)
			const responseData = await response
				.json()
				.catch(() => response.text())

			if (response.ok) {
				if (setState) setData(responseData)
				setError(null)
				return responseData
			} else {
				const errObj = {
					error: {
						status: response.status,
						statusText: response.statusText,
						...(typeof responseData === 'object'
							? responseData
							: { message: responseData }),
					},
				}
				setError(errObj)
				throw errObj
			}
		} catch (err) {
			if (!err.error) {
				const networkError = {
					error: { message: 'خطای شبکه یا عدم اتصال به سرور' },
				}
				setError(networkError)
				throw networkError
			} else {
				setError(err)
				throw err
			}
		} finally {
			callsRef.current--
			if (callsRef.current === 0) setLoading(false)
		}
	}

	useEffect(() => {
		if (!request) return
		const controller = new AbortController()
		getAPI({ ...request, signal: controller.signal }).catch(() => {})
		return () => controller.abort()
	}, [request])

	return {
		init: (requestUrl, params = {}) => {
			const last = lastRequestRef.current
			if (
				last.requestUrl === requestUrl &&
				JSON.stringify(last.params) === JSON.stringify(params)
			)
				return
			lastRequestRef.current = { requestUrl, params }
			setRequest({ requestUrl, params })
		},
		get: (requestUrl, params) => getAPI({ requestUrl, params }),
		post: (requestUrl, params) =>
			getAPI({ requestUrl, method: 'POST', params }),
		put: (requestUrl, params) =>
			getAPI({ requestUrl, method: 'PUT', params }),
		delete: requestUrl => getAPI({ requestUrl, method: 'DELETE' }),
		setData,
		data,
		isLoading,
		error,
	}
}
