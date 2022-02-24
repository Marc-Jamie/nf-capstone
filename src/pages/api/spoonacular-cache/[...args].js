// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// TODO: Refactor caching w. https://www.npmjs.com/package/lru-cache
import axios from "axios";
import path from "node:path";
import process from "node:process";
import { URLSearchParams } from "node:url";

const cache = {};
const handler = async (request, response) => {
	const { args, ...params } = request.query;
	const id = args.join("/");
	const host = "api.spoonacular.com";
	const endpoint = path.join(host, id);
	const url = `https://${endpoint}`;

	const options = {
		params: { ...params, apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY },
	};
	const urlParams = new URLSearchParams(params).toString();
	const key = `${url}?${urlParams}`;
	if (cache[key]) {
		response.status(200).json(cache[key]);
	} else {
		const { data } = await axios.get(url, options);

		cache[key] = data;

		response.status(200).json(data);
	}
};

export default handler;
