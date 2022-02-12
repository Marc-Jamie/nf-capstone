// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: Refactor caching w. https://www.npmjs.com/package/lru-cache
import axios from "axios";
import path from "node:path";

// const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 180;

let cache = {};
const handler = async (request, response) => {
	// console.log(cache);
	const { args, ...params } = request.query;
	const id = args.join("/");
	// https://api.spoonacular.com  ?apiKey=apikey
	const host = "api.spoonacular.com";
	const endpoint = path.join(host, id);
	const url = `https://${endpoint}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;
	//console.log(">>>>>", id);
	//console.log(">>>>>", endpoint);
	//console.log(">>>>>", url);
	const options = {
		params,
	};
	//console.log(">>>>>", cache[url]);
	//console.log(">>>", url);
	if (cache[url]) {
		console.log(`Getting data from cache on ${new Date().toISOString()}`);
		response.status(200).json(cache[url].data);
	} else {
		console.log(`Fetching new data from API on ${new Date().toISOString()}`);
		const { data } = await axios.get(url, options);
		const fullData = { ...cache, [url]: { data: data } };
		cache = fullData;
		//console.log(">>>>>>>>>>>>>>>>", cache);
		// setTimeout(() => {
		// 	cache[url] = null;
		// }, REFRESH_INTERVAL);
		response.status(200).json(cache[url].data);
	}
};

export default handler;
