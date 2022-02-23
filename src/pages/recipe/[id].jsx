import React, { useMemo, useState } from "react";
import useGet from "../../ions/hooks/fetch/get";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import uniqBy from "lodash.uniqby";
import useShoppinglist from "../../ions/store/useShoppinglist";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "../../molecules/expand-more/styled";
import Collapse from "@mui/material/Collapse";
import useFridge from "../../ions/store/useFridge";
import ListItemIcon from "@mui/material/ListItemIcon";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Layout from "../../organisms/layout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Recipe = () => {
	const addIngredient = useShoppinglist(state => state.addIngredient);
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const ingredients = useFridge(state => state.ingredients);
	const items = useShoppinglist(state => state.ingredients);

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
	const {
		query: { id },
	} = useRouter();
	const { data } = useGet(`/api/spoonacular/recipes/${id}/information/`);
	const { data: instructionsData } = useGet(
		`/api/spoonacular/recipes/${id}/analyzedInstructions`
	);

	const uniqueIngredients = useMemo(() => {
		return data ? uniqBy(data.extendedIngredients, "id") : [];
	}, [data]);

	if (!data || !instructionsData) {
		return <div>loading... </div>;
	}
	return (
		<Layout>
			<Stack spacing={2} sx={{ m: 2 }}>
				<Card sx={{ bgcolor: `background.paper` }}>
					<CardMedia component="img" image={data.image} alt={data.title} />
					<CardHeader component="h1" title={data.title} />
					<Stack direction="row" spacing={1} mx={2}>
						<Chip label={`ready in: ${data.readyInMinutes} minutes`} />
						<Chip label={`likes: ${data.aggregateLikes} `} />
					</Stack>

					<Stack direction="row" spacing={0.5} sx={{ m: 2 }}>
						<Typography variant="h5" sx={{ fontSize: "1.7rem" }}>
							Ingredients
						</Typography>
						<ExpandMore
							expand={expanded}
							aria-expanded={expanded}
							aria-label="show more"
							onClick={handleExpandClick}
						>
							<ExpandMoreIcon />
						</ExpandMore>
					</Stack>
					<Collapse unmountOnExit in={expanded} timeout="auto">
						<Stack spacing={2} sx={{ m: 2 }}>
							<Button
								onClick={() => {
									const listItems = uniqueIngredients.map(ingredient => {
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
								{uniqueIngredients.map(ingredient => {
									const yes = ingredients.some(item => item.id === ingredient.id);
									const oui = items.some(item => item.name === ingredient.name);

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
													{oui ? (
														<CheckCircleIcon />
													) : (
														<AddShoppingCartIcon />
													)}
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
							<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
								<Alert
									severity="success"
									sx={{ width: "100%" }}
									onClose={handleClose}
								>
									{shopping} added to shoppinglist!
								</Alert>
							</Snackbar>
						</Stack>
					</Collapse>
					<Stack mx={2}>
						{instructionsData.length > 0 && (
							<Typography variant="h5" sx={{ fontSize: "1.7rem" }}>
								Preparation
							</Typography>
						)}
						{instructionsData
							.map((item, index) => ({ ...item, id: index }))
							.map(instruction => {
								return (
									<div key={instruction.id}>
										<Typography variant="h3">{instruction.name}</Typography>
										<List sx={{ p: 0 }}>
											{instruction.steps.map(step => {
												return (
													<ListItem key={step.number}>
														<Typography component="div">
															{" "}
															{step.step}
														</Typography>
													</ListItem>
												);
											})}
										</List>
									</div>
								);
							})}
					</Stack>
				</Card>
			</Stack>
		</Layout>
	);
};
export default Recipe;
export const getServerSideProps = () => {
	return {
		props: {},
	};
};
