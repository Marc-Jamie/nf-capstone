import create from "zustand";

const useSearch = create(set => ({
	results: [],
	setResults: results => {
		set({ results });
	},
}));
export default useSearch;
