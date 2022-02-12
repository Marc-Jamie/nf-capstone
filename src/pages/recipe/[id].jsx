import React from "react";
import useGet from "../../ions/hooks/fetch/get";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
//import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const Recipe = () => {
	const {
		query: { id },
	} = useRouter();

	const { data } = useGet(`/api/spoonacular/recipes/${id}/information/`);

	const { data: instructionsData } = useGet(
		`/api/spoonacular/recipes/${id}/analyzedInstructions/`
	);
	if (!data || !instructionsData) {
		return <div>loading... </div>;
	}
	return (
		<Card>
			<CardHeader title="title" />

			{/* <CardMedia component="img" height="140" image={`image`} alt={title} /> */}

			{/* is data && always required? and can i abbreviate this */}
			<Stack direction="row" spacing={1}>
				<Chip label={`ready in: ${data.readyInMinutes} minutes`} />
				<Chip label={`likes: ${data.aggregateLikes} `} />
			</Stack>

			<ul>
				{data.extendedIngredients?.map(ingredient => {
					return <li key={ingredient.id}>{ingredient.name}</li>;
				})}
			</ul>
		</Card>
	);
};
export default Recipe;
export const getServerSideProps = () => {
	return {
		props: {},
	};
};
