import React from "react";
import Footer from "../footer";

const Layout = ({ children }) => {
	return (
		<>
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
