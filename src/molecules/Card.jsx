import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import useGet from "../ions/hooks/fetch/get";
import { useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "./expand-more/styled";
import Collapse from "@mui/material/Collapse";

const RecipeCard = ({ recipe }) => {
	const { data } = useGet(`api/spoonacular/recipes/${recipe.id}/information`);
	useEffect(() => {
		console.log(data);
	}, [data]);
	console.log(data);

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	console.log(recipe);
	return (
		<Card sx={{ maxWidth: 345 }}>
			{data && (
				<CardHeader
					title={recipe.title}
					subheader={`ready in: ${data.readyInMinutes} minutes`}
				/>
			)}
			<CardMedia component="img" height="140" image={recipe.image} alt={recipe.title} />

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
						<Typography>
							<span dangerouslySetInnerHTML={{ __html: data.summary }} />
						</Typography>
					)}
				</CardContent>
				{data && (
					<Typography paragraph>
						<ul>
							You need:
							{data.extendedIngredients?.map(ingredient => {
								return (
									<li key={ingredient.id}>
										{ingredient.amount} {ingredient.unit} {ingredient.name}
									</li>
								);
							})}
						</ul>
					</Typography>
				)}
			</Collapse>
		</Card>
	);
};
export default RecipeCard;
