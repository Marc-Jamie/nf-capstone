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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "../../molecules/expand-more/styled";
import Collapse from "@mui/material/Collapse";
import HeadBar from "../../molecules/headbar";

const Recipe = () => {
	const addIngredient = useShoppinglist(state => state.addIngredient);
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const {
		query: { id },
	} = useRouter();
	const { data } = useGet(`/api/spoonacular/recipes/${id}/information/`);
	const { data: instructionsData } = useGet(
		`/api/spoonacular/recipes/${id}/analyzedInstructions`
	);
	//mui table

	const uniqueIngredients = useMemo(() => {
		return data ? uniqBy(data.extendedIngredients, "id") : [];
	}, [data]);

	if (!data || !instructionsData) {
		return <div>loading... </div>;
	}
	return (
		<>
			<HeadBar />
			<Stack spacing={2} sx={{ m: 2 }}>
				<Card sx={{ bgcolor: `background.paper` }}>
					<CardMedia component="img" image={data.image} alt={data.title} />
					<CardHeader component="h1" title={data.title} />
					<Stack direction="row" spacing={1} mx={2}>
						<Chip label={`ready in: ${data.readyInMinutes} minutes`} />
						<Chip label={`likes: ${data.aggregateLikes} `} />
					</Stack>
					<Stack direction="row" spacing={0.5} sx={{ m: 2 }}>
						<Typography variant="h4">Ingredients</Typography>
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
									const listItems = data.extendedIngredients.map(ingredient => {
										return ingredient.name;
									});

									listItems.map(item => {
										addIngredient(item);
									});
								}}
							>
								Add to shoppinglist
							</Button>
							<TableContainer component={Paper}>
								<Table>
									<TableBody>
										{uniqueIngredients.map(row => (
											<TableRow
												key={row.id}
												sx={{
													"&:last-child td, &:last-child th": {
														border: 0,
													},
												}}
											>
												<TableCell component="th" scope="row">
													{row.name}
												</TableCell>
												<TableCell align="right">{row.unit}</TableCell>
												<TableCell align="right">{row.amount}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>{" "}
						</Stack>
					</Collapse>
					<Stack mx={2}>
						{instructionsData.length > 0 && (
							<Typography variant="h4">Preparation</Typography>
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
		</>
	);
};
export default Recipe;
export const getServerSideProps = () => {
	return {
		props: {},
	};
};
