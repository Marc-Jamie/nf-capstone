import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../ions/theme";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link crossOrigin rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&family=Caveat&family=Comfortaa:wght@400;700&family=Josefin+Sans:wght@400;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;500;600;700&family=Sansita+Swashed&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
