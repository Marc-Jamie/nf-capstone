import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<header>
			<nav data-test-id="navigation">
				<Link href="/">Home</Link>
				<Link href="/fridge">Fridge</Link>
			</nav>
		</header>
	);
};

export default Header;
