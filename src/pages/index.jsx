import Head from "next/head";
import React from "react";
// import useGet from "../ions/hooks/fetch/get";
import Layout from "../organisms/layout";
import RecipeReviewCard from "../molecules/Cards";

const Page = () => {
	// const { data, loading, error } = useGet(`/api/spoonacular/recipes/complexSearch`);
	// console.log(">>>>>", data);
	return (
		<Layout>
			<Head>
				<title key="title">My Project</title>
				<meta key="description" name="description" content="This is my project" />
			</Head>

			<RecipeReviewCard />
		</Layout>
	);
};

export default Page;
