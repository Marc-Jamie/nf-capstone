import React, { useState, useEffect } from "react";
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

const RecipeCard = ({ recipe }) => {
	const { data } = useGet(`/api/spoonacular/recipes/${recipe.id}/information`);
	const [expanded, setExpanded] = useState(false);
	const addIngredient = useShoppinglist(state => state.addIngredient);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card sx={{ maxWidth: 345 }}>
			{data && (
				<Link href={`/recipe/${recipe.id}`}>
					<CardHeader
						title={recipe.title}
						subheader={`ready in: ${data.readyInMinutes} minutes`}
					/>
				</Link>
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
					{/* Test this out:
					<Typography variant="h6" >
					{HTMLparse(`${data.summary}`)}
					</Typography> */}
					{data && (
						<Typography component="div">
							<span dangerouslySetInnerHTML={{ __html: data.summary }} />
						</Typography>
					)}
				</CardContent>

				{data && (
					<div>
						<Button
							onClick={() => {
								const listItems = data.extendedIngredients.map(ingredient => {
									return ingredient.name;
								});
								console.log(listItems);

								listItems.map(item => {
									addIngredient(item);
								});
							}}
						>
							Add to shoppinglist
						</Button>

						<Typography component="ul">
							You need:
							{data.extendedIngredients?.map(ingredient => {
								return (
									<Typography key={ingredient.id} component="li">
										{ingredient.amount} {ingredient.unit} {ingredient.name}
									</Typography>
								);
							})}
						</Typography>
					</div>
				)}
			</Collapse>
		</Card>
	);
};
export default RecipeCard;
