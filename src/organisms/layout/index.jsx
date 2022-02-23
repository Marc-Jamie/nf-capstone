import React from "react";
import FootBar from "../../molecules/footbar";
import HeadBar from "../../molecules/headbar";
const Layout = ({ children }) => {
	return (
		<>
			<HeadBar />

			<main>{children}</main>
			<FootBar />
		</>
	);
};

export default Layout;
