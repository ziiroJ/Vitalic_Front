const {
	createProxyMiddleware,
} = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		createProxyMiddleware("/user", {
			target: "http://localhost:8080",
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware("/api", {
			target: "http://127.0.0.1:8000",
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware("/api/v2", {
			target: "http://192.168.0.16:8000",
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware("/user/v1", {
			target: "http://192.168.0.16:8080",
			changeOrigin: true,
		})
	);
};
