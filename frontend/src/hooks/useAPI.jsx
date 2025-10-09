/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, useRef, createContext } from 'react'
import useNotification from '../hooks/useNotification'

const apiUrl = '/api'

const APIContext = createContext({})

export function APIProvider({
	config = { cache: false },
	requests,
	cache = {},
	children,
}) {
	return (
		<APIContext.Provider value={{ config, requests, cache }}>
			{children}
		</APIContext.Provider>
	)
}

export default function useAPI() {
	const [data, setData] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [request, setRequest] = useState(null)
	const lastRequestRef = useRef({})
	const callsRef = useRef(0)
	const { openNotification } = useNotification()

	function buildQueryString(params) {
		if (!params || typeof params !== 'object') return ''

		const query = Object.entries(params)
			.map(([key, value]) => {
				if (typeof value === 'object') {
					return `${key}=${encodeURIComponent(JSON.stringify(value))}`
				}
				return `${key}=${encodeURIComponent(value)}`
			})
			.join('&')

		return query ? `?${query}` : ''
	}

	async function getAPI({
		requestUrl,
		method = 'GET',
		setState = true,
		params,
		signal,
		resolve,
	} = {}) {
		const requestInit = {
			method,
			headers: {},
			credentials: 'include',
			signal,
		}
		let querystring = ''

		switch (method) {
			case 'GET':
				querystring = buildQueryString(params)
				break
			case 'DELETE':
			case 'POST':
			case 'PUT':
			case 'PATCH':
				if (params instanceof FormData) {
					requestInit.body = params
				} else {
					requestInit.headers = {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					}
					requestInit.body = JSON.stringify(params)
				}
				break
		}

		if (callsRef.current === 0) setLoading(true)
		callsRef.current++

		try {
			const url = `${apiUrl.replace(/\/+$/g, '')}/${requestUrl.replace(
				/^\/+/g,
				''
			)}${querystring}`
			const response = await fetch(url, requestInit)
			const contentType = response.headers.get('Content-Type') || ''
			const data = contentType.includes('application/json')
				? await response.json()
				: await response.text()

			if (response.status === 200 || response.status === 201) {
				if (setState) setData(data)
				if (resolve) resolve(data)
				setError(false)
				return data
			} else {
				const errObj = {
					error: {
						status: response.status,
						statusText: response.statusText,
						...data,
					},
				}

				if (response.status === 406) {
					openNotification('error', data.message)
				}

				setError(errObj)
				throw errObj
			}
		} catch (error) {
			if (error.code !== 20) setError(error)
			throw error
		} finally {
			callsRef.current--
			if (callsRef.current === 0) setLoading(false)
		}
	}

	async function mutate(
		{ requestUrl, method, params, optimisticUpdate, rollback },
		responseHandler
	) {
		let prevDataSnapshot = data

		if (optimisticUpdate) {
			setData(current => {
				const optimisticState = optimisticUpdate(current)
				prevDataSnapshot = current
				return optimisticState
			})
		}

		try {
			const res = await getAPI({
				requestUrl,
				method,
				params,
				setState: false,
			})

			if (responseHandler) {
				setData(current => responseHandler(current, res))
			} else {
				setData(res)
			}

			return res
		} catch (err) {
			if (optimisticUpdate && rollback) {
				setData(rollback(prevDataSnapshot))
			}
			throw err
		}
	}

	useEffect(() => {
		if (!request) return
		const { requestUrl, params, forceRefresh } = request
		const controller = new AbortController()
		getAPI({
			requestUrl,
			params,
			signal: controller.signal,
			forceRefresh,
		}).catch(() => {})
		return () => controller.abort()
	}, [request])

	return {
		init: (requestUrl, params = false, forceRefresh = false) => {
			const last = lastRequestRef.current
			if (
				last.requestUrl === requestUrl &&
				JSON.stringify(last.params) === JSON.stringify(params) &&
				last.forceRefresh === forceRefresh
			)
				return
			lastRequestRef.current = { requestUrl, params, forceRefresh }
			setRequest({ requestUrl, params, forceRefresh })
		},
		get: (requestUrl, params) => getAPI({ requestUrl, params }),
		post: (
			requestUrl,
			params,
			{ optimisticUpdate, rollback, responseHandler } = {}
		) =>
			mutate(
				{
					requestUrl,
					method: 'POST',
					params,
					optimisticUpdate,
					rollback,
				},
				responseHandler
			),
		put: (
			requestUrl,
			params,
			{ optimisticUpdate, rollback, responseHandler } = {}
		) =>
			mutate(
				{
					requestUrl,
					method: 'PUT',
					params,
					optimisticUpdate,
					rollback,
				},
				responseHandler
			),
		patch: (
			requestUrl,
			params,
			{ optimisticUpdate, rollback, responseHandler } = {}
		) =>
			mutate(
				{
					requestUrl,
					method: 'PATCH',
					params,
					optimisticUpdate,
					rollback,
				},
				responseHandler
			),
		delete: (
			requestUrl,
			params,
			{ optimisticUpdate, rollback, responseHandler } = {}
		) =>
			mutate(
				{
					requestUrl,
					method: 'DELETE',
					params,
					optimisticUpdate,
					rollback,
				},
				responseHandler
			),
		appendData: transformFn => {
			setData(prev => {
				if (!prev) return prev
				return transformFn(prev)
			})
		},
		setData,
		data,
		isLoading,
		error,
	}
}
