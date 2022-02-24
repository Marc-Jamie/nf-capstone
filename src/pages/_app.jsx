import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../ions/theme";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link crossOrigin rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&family=Caveat&family=Comfortaa:wght@400;700&family=Josefin+Sans:wght@400;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;500;600;700&family=Sansita+Swashed&display=swap"
					rel="stylesheet"
				/>
				<meta name="application-name" content="EatMe" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<meta name="apple-mobile-web-app-title" content="EatMe" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="robots" content="noindex,nofollow" />
				<meta name="theme-color" content="#226F54" />
				{/* <link rel="manifest" href="/manifest.json" /> */}
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
