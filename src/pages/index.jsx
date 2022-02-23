import Head from "next/head";
import React from "react";
import Layout from "../organisms/layout";
import RecipeReviewCard from "../molecules/Cards";

const Page = () => {
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
