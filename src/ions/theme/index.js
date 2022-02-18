import { createTheme } from "@mui/material/styles";

const theme = createTheme({
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
		MuiListItem: {
			styleOverrides: {
				root: {
					backgroundColor: "#FFFF",
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
					borderRadius: 0,
					backgroundColor: "#FF00FF",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#00AF00",
					color: "#FF0000",
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
