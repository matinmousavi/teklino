import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { products, bestsellers } from './src/data/mockProducts.js'

const allProducts = [...products, ...bestsellers]

export default defineConfig({
	plugins: [
		react(),
		{
			name: 'mock-api-server',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === '/api/products') {
						res.setHeader('Content-Type', 'application/json')
						res.end(JSON.stringify(allProducts))
						return
					}

					const productMatch = req.url.match(
						/^\/api\/products\/(\d+)$/
					)
					if (productMatch) {
						const productId = parseInt(productMatch[1], 10)
						const product = allProducts.find(
							p => p.id === productId
						)
						res.setHeader('Content-Type', 'application/json')
						if (product) {
							res.end(JSON.stringify(product))
						} else {
							res.statusCode = 404
							res.end(
								JSON.stringify({ message: 'Product not found' })
							)
						}
						return
					}
					next()
				})
			},
		},
	],
})
