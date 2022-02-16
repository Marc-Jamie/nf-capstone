import React, { useMemo } from "react";
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
import uniqBy from "lodash.uniqby";
//mui table >>>>>>>
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//>>>>>>

const Recipe = () => {
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

	//>>>>
	if (!data || !instructionsData) {
		return <div>loading... </div>;
	}
	return (
		<Card sx={{ bgcolor: `background.paper` }}>
			<CardHeader variant="h1" title={data.title} />
			<CardMedia component="img" height="140" image={data.image} alt={data.title} />
			<p> </p>
			<Stack direction="row" spacing={1}>
				<Chip label={`ready in: ${data.readyInMinutes} minutes`} />
				<Chip label={`likes: ${data.aggregateLikes} `} />
			</Stack>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>name</TableCell>
							<TableCell align="right">amount</TableCell>
							<TableCell align="right">unit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{uniqueIngredients.map(row => (
							<TableRow
								key={row.name + row.unit}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
			</TableContainer>
			{instructionsData.length > 0 && <Typography variant="h2">Preparation</Typography>}
			{instructionsData.map((instruction, index) => {
				return (
					<Typography key={index}>
						<Typography variant="h3">{instruction.name}</Typography>
						<List>
							{instruction.steps.map(step => {
								return <ListItem key={step.number}>{step.step}</ListItem>;
							})}
						</List>
					</Typography>
				);
			})}
		</Card>
	);
};
export default Recipe;
export const getServerSideProps = () => {
	return {
		props: {},
	};
};
