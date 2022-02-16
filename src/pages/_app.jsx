import { Global } from "@emotion/react";
import React from "react";
import { globalStyle } from "../ions/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../ions/theme";

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyle} />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
