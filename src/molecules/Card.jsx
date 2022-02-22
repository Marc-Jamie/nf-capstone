import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import useGet from "../ions/hooks/fetch/get";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "./expand-more/styled";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";
import Button from "@mui/material/Button";
import useShoppinglist from "../ions/store/useShoppinglist";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useFridge from "../ions/store/useFridge";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const RecipeCard = ({ recipe }) => {
	const { data } = useGet(`/api/spoonacular/recipes/${recipe.id}/information`);
	const [expanded, setExpanded] = useState(false);
	const addIngredient = useShoppinglist(state => state.addIngredient);
	const ingredients = useFridge(state => state.ingredients);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
	});

	const [open, setOpen] = useState(false);
	const [shopping, setShopping] = useState("Items");

	const handleClick = ingredient => {
		setOpen(true);
		setShopping(ingredient);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setShopping("Items");
		setOpen(false);
	};

	return (
		<Card>
			{data && (
				<Stack>
					<Link passHref href={`/recipe/${recipe.id}`}>
						<a>
							<CardMedia
								component="img"
								height="140"
								image={recipe.image}
								alt={recipe.title}
							/>
						</a>
					</Link>
					<Link passHref href={`/recipe/${recipe.id}`}>
						<CardHeader
							component="a"
							title={recipe.title}
							subheader={`ready in: ${data.readyInMinutes} minutes`}
							sx={{ color: "currentColor", textDecoration: "none" }}
						/>
					</Link>
				</Stack>
			)}

			<ExpandMore
				expand={expanded}
				aria-expanded={expanded}
				aria-label="show more"
				onClick={handleExpandClick}
			>
				<ExpandMoreIcon />
			</ExpandMore>
			<Collapse unmountOnExit in={expanded} timeout="auto">
				<CardContent>
					{data && (
						<Typography component="div">
							<div dangerouslySetInnerHTML={{ __html: data.summary }} />
						</Typography>
					)}
				</CardContent>

				{data && (
					<Stack spacing={2} sx={{ m: 2 }}>
						<Button
							onClick={() => {
								const listItems = data.extendedIngredients.map(ingredient => {
									return ingredient.name;
								});

								listItems.map(item => {
									addIngredient(item);
								});
								handleClick("Items");
							}}
						>
							Add to shoppinglist
						</Button>

						<List component="ul">
							<Typography variant="h4"> You need:</Typography>
							{data.extendedIngredients?.map(ingredient => {
								const yes = ingredients.some(item => item.id === ingredient.id);
								return (
									<ListItem
										key={ingredient.id}
										component="li"
										secondaryAction={
											<IconButton
												edge="end"
												aria-label="add to shoppinglist"
												onClick={() => {
													addIngredient(ingredient.name);
													handleClick(ingredient.name);
												}}
											>
												<AddShoppingCartIcon />
											</IconButton>
										}
									>
										<ListItemIcon>
											{yes ? (
												<PlaylistAddCheckCircleIcon />
											) : (
												<RadioButtonUncheckedIcon />
											)}
										</ListItemIcon>
										{ingredient.amount} {ingredient.unit} {ingredient.name}{" "}
									</ListItem>
								);
							})}
							<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
								<Alert
									severity="success"
									sx={{ width: "100%" }}
									onClose={handleClose}
								>
									{shopping} added to shoppinglist!
								</Alert>
							</Snackbar>
						</List>
					</Stack>
				)}
			</Collapse>
		</Card>
	);
};
export default RecipeCard;
