import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

const RecipeCard = ({ title, image }) => {
	return (
		<Card>
			<CardHeader title={title} />
			<CardMedia component="img" height="140" image={image} alt={title} />
		</Card>
	);
};
export default RecipeCard;
