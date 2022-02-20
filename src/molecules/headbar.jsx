import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import axios from "axios";
import { useDebounce } from "use-debounce";
import RecipeCard from "./Card";
import TextField from "@mui/material/TextField";
import useSearch from "../ions/store/useSearch";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";

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
					console.log("1.", response.data.results);
					setResults(response.data.results);
				});
		} else {
			setResults([]);
		}
	}, [debouncedSearch]);
	//Menu
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<div>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							id="basic-button"
							aria-controls={open ? "basic-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						>
							<MenuIcon />
						</IconButton>

						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>
								<Link href="/">Home</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/fridge">Fridge</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/shoppinglist">Shoppinglist</Link>
							</MenuItem>
						</Menu>
					</div>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						EatMe
						<svg style={({ width: "24px" }, { height: "24px" })} viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22 3L10 4.41V6H22V7H10V12H22C22 13.81 21.43 15.46 20.32 16.95S17.77 19.53 16 20.25V22H8V20.25C6.24 19.53 4.79 18.43 3.68 16.95S2 13.81 2 12H5V4L22 2V3M6 4.88V6H7V4.78L6 4.88M6 7V12H7V7H6M9 12V7H8V12H9M9 6V4.55L8 4.64V6H9Z"
							/>
						</svg>
					</Typography>
					<Typography
						noWrap
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						Hungry?
					</Typography>
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
				</Toolbar>
			</AppBar>
			{results.length > 0 && (
				<Paper elevation={5} sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
					<List sx={{ background: "none" }}>
						{results.map(result => {
							return (
								<ListItem key={result.id}>
									<ListItemIcon>
										<Avatar src={result.image} />
									</ListItemIcon>
									<Link href={`/recipe/${result.id}`}>
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
