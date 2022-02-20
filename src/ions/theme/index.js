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
		h2: {
			fontFamily: "fantasy",
		},
		h3: {
			fontFamily: "fantasy",
			fontWeight: 700,
		},
	},
	shape: {
		borderRadius: 16,
	},
	components: {
		MuiList: {
			styleOverrides: {
				root: {
					backgroundColor: "#F4F0BB",
				},
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
		MuiCard: {
			styleOverrides: {
				root: {
					// backgroundColor: "#FFFF00",
					// color: "#000000",
				},
			},
		},
		MuiCardMedia: {
			styleOverrides: {
				root: {
					borderRadius: "0 0 20px 0",
				},
			},
		},
		MuiCardHeader: {
			styleOverrides: {
				subheader: {
					// backgroundColor: "#0000FF",
					// color: "#FFFF00",
				},
				title: {
					// backgroundColor: "#FF00FF",
					// color: "#FFFF00",
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					// backgroundColor: "#FF0000",
					// color: "#000000",
					// "&:hover": {
					// 	backgroundColor: "#00FF00",
					// 	color: "#000000",
					//},
				},
			},
		},
	},
});

export default theme;
