import { HelmetProvider, Helmet } from "react-helmet-async";
import React from "react";
// import useGet from "../ions/hooks/fetch/get";
import Layout from "../organisms/layout";
import RecipeReviewCard from "../molecules/Cards";

console.log(process.env);
const Page = () => {
	// const { data, loading, error } = useGet(
	// 	`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	// );

	return (
		<Layout>
			<HelmetProvider>
				<Helmet>
					<title key="title">My Project</title>
					<meta key="description" name="description" content="This is my project" />
				</Helmet>
			</HelmetProvider>
			<h1>Recipes</h1>
			<RecipeReviewCard />
		</Layout>
	);
};

export default Page;
