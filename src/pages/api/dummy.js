export default function handler(req, res) {
	res.status(200).json({
		results: [
			{
				id: 716426,
				title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
				image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
				imageType: "jpg",
			},
			{
				id: 715594,
				title: "Homemade Garlic and Basil French Fries",
				image: "https://spoonacular.com/recipeImages/715594-312x231.jpg",
				imageType: "jpg",
			},
		],
		offset: 0,
		number: 10,
		totalResults: 5226,
	});
}
