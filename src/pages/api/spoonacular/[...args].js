// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: Refactor caching w. https://www.npmjs.com/package/lru-cache
import axios from "axios";
import path from "node:path";
import process from "node:process";
import { readFile, writeFile } from "fs/promises";

// const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 180;
const cacheFile = path.join(process.cwd(), "cache.json");
const localCache = {};
const handler = async (request, response) => {
	const cacheBuffer = process.env.NODE_ENV === "production" ? null : await readFile(cacheFile);
	const cache = process.env.NODE_ENV === "production" ? localCache : JSON.parse(cacheBuffer);
	console.log(cache);
	const { args, ...params } = request.query;
	const id = args.join("/");
	const host = "api.spoonacular.com";
	const endpoint = path.join(host, id);
	const url = `https://${endpoint}?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;

	const options = {
		params,
	};

	if (cache[url]) {
		console.log(`Getting data from cache on ${new Date().toISOString()}`);
		response.status(200).json(cache[url]);
	} else {
		console.log(`Fetching new data from API on ${new Date().toISOString()}`);
		const { data } = await axios.get(url, options);

		cache[url] = data;
		if (process.env.NODE_ENV === "production") {
			writeFile(cacheFile, JSON.stringify(cache));
		}
		response.status(200).json(data);
	}
};

export default handler;
