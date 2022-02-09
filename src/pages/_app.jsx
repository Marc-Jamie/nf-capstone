import { Global } from "@emotion/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./";
import About from "./about";
import { globalStyle } from "../ions/styles";
import Fridge from "./fridge";
import ShoppingList from "./shoppinglist";
import Recipe from "../molecules/recipe";

const App = () => {
	return (
		<>
			<Global styles={globalStyle} />
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="about/" element={<About />} />
						<Route path="fridge/" element={<Fridge />} />
						<Route path="shoppinglist/" element={<ShoppingList />} />
						<Route path="recipe/:id" element={<Recipe />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
