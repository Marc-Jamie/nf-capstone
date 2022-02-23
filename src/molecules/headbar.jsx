import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import axios from "axios";
import { useDebounce } from "use-debounce";
import useSearch from "../ions/store/useSearch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const HeadBar = () => {
	//Searchbar
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 1_000);
	const results = useSearch(state => state.results);

	useEffect(() => {
		const setResults = useSearch.getState().setResults;
		if (debouncedSearch) {
			axios
				.get(`/api/spoonacular-cache/recipes/complexSearch?query=${debouncedSearch}`)
				.then(response => {
					setResults(response.data.results);
				});
		} else {
			setResults([]);
		}
	}, [debouncedSearch]);

	return (
		<Box>
			<Toolbar />
			<AppBar position="fixed">
				<Toolbar>
					<Stack direction="row" gap={3}>
						<Box
							component="a"
							href="#"
							sx={{
								textDecoration: "none",
								color: "currentColor",
								display: "flex",
								alignContent: "flex-end",
							}}
							onClick={event => {
								event.preventDefault();
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						>
							<Typography
								variant="h6"
								component="div"
								sx={{
									lineHeight: "24px",
									display: "flex",
									alignItems: "center",
									m: 0,
									gap: 0.5,
								}}
							>
								Eat
								<svg
									style={({ width: "24px" }, { height: "24px" })}
									viewBox="0 0 24 24"
								>
									<path
										fill="currentColor"
										d="M22 3L10 4.41V6H22V7H10V12H22C22 13.81 21.43 15.46 20.32 16.95S17.77 19.53 16 20.25V22H8V20.25C6.24 19.53 4.79 18.43 3.68 16.95S2 13.81 2 12H5V4L22 2V3M6 4.88V6H7V4.78L6 4.88M6 7V12H7V7H6M9 12V7H8V12H9M9 6V4.55L8 4.64V6H9Z"
									/>
								</svg>
								Me
							</Typography>
						</Box>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
								value={search}
								onChange={event => {
									setSearch(event.target.value);
								}}
							/>
						</Search>
					</Stack>
				</Toolbar>
			</AppBar>
			{results.length > 0 && (
				<Paper elevation={5} sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
					<List sx={{ background: "none" }}>
						{results.map(result => {
							return (
								<ListItem
									key={result.id}
									onClick={() => {
										setSearch("");
									}}
								>
									<ListItemIcon>
										<Avatar src={result.image} />
									</ListItemIcon>
									<Link passHref href={`/recipe/${result.id}`}>
										<Typography>{result.title}</Typography>
									</Link>
								</ListItem>
							);
						})}
					</List>
				</Paper>
			)}
		</Box>
	);
};

export default HeadBar;
