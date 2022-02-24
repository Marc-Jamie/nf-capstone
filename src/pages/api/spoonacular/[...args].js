// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: Refactor caching w. https://www.npmjs.com/package/lru-cache
import axios from "axios";
import path from "node:path";
import process from "node:process";
// import { readFile, writeFile } from "fs/promises";
import LRU from "lru-cache";

// const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 180;
// const cacheFile = path.join(process.cwd(), "cache.json");
const cache = new LRU({ ttl: 1000 * 60 * 15, max: 100 });

const handler = async (request, response) => {
	// if (process.env.NODE_ENV !== "production") {
	// 	const cacheBuffer = await readFile(cacheFile);
	// 	const cache = JSON.parse(cacheBuffer);
	// }

	const { args, ...params } = request.query;
	const id = args.join("/");
	const host = "api.spoonacular.com";
	const endpoint = path.join(host, id);
	const url = `https://${endpoint}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;

	const options = {
		params,
	};
	const cachedValue = cache.get(url);
	if (cachedValue) {
		console.log("using cache");
		response.status(200).json(cachedValue);
	} else {
		console.log("fetching from api");
		const { data } = await axios.get(url, options);

		cache.set(url, data);
		// if (process.env.NODE_ENV !== "production") {
		// 	writeFile(cacheFile, JSON.stringify(cache));
		// }

		response.status(200).json(data);
	}
};

export default handler;
