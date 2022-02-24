// const withPwa = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	// 	pwa: {
	// 		disable: process.env.NODE_ENV === "development",
	// 		dest: "public",
	// 		register: true,
	// 		skipWaiting: true,
	// 		// runtimeCaching,
	// 		// buildExcludes: [/middleware-manifest.json$/],
	// 	},
};

module.exports = nextConfig;
