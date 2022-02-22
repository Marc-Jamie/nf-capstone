import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		background: {
			paper: "#f8f8f2",
			default: "#F4F0BB",
		},
		primary: {
			//DarkGreen
			main: "#226F54",
		},
		secondary: {
			//Beige
			main: "#F4F0BB",
		},
	},
	typography: {
		//font-family: 'Big Shoulders Stencil Text', cursive;
		// fontFamily: "'Caveat', sans-serif",
		// font-family: 'Comfortaa', cursive;
		// fontFamily: "'Josefin Sans', sans-serif",
		// fontFamily: "'Open Sans', sans-serif",
		// fontFamily: "'Sansita Swashed', sans-serif",
		// fontFamily: "'Nunito', sans-serif",
		fontFamily: "'Comfortaa', sans-serif",

		// h3: { fontFamily: "'Sansita Swashed', sans-serif" },
		// h4: { fontFamily: "'Sansita Swashed', sans-serif" },
		h1: { fontFamily: "'Caveat', sans-serif" },
		h2: { fontFamily: "'Caveat', sans-serif" },
		h3: { fontFamily: "'Caveat', sans-serif" },
		h4: { fontFamily: "'Caveat', sans-serif" },
	},
	shape: {
		borderRadius: 16,
	},
	components: {
		MuiCardHeader: {
			styleOverrides: {
				root: {
					variant: "h1",
				},
				title: {
					fontFamily: "'Caveat', sans-serif",
					fontSize: "2.3rem",
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: "#ffffff",
				},
			},
		},
		MuiButton: {
			defaultProps: {
				variant: "contained",
				disableRipple: true,
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 5,
					backgroundColor: "#226F54",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#ffffff",
				},
			},
		},
	},
});

export default theme;
