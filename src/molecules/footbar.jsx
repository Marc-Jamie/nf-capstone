import React from "react";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import KitchenIcon from "@mui/icons-material/Kitchen";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";

const FootBar = () => {
	const { asPath, push } = useRouter();

	return (
		<>
			<Toolbar />
			<Box
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
				}}
				elevation={3}
			>
				<BottomNavigation showLabels value={asPath}>
					<BottomNavigationAction
						value="/"
						label="Home"
						icon={<HomeIcon />}
						onClick={() => {
							push("/");
						}}
					/>
					<BottomNavigationAction
						value="/fridge"
						label="Fridge"
						icon={<KitchenIcon />}
						onClick={() => {
							push("/fridge");
						}}
					/>
					<BottomNavigationAction
						value="/shoppinglist"
						label="Shoppinglist"
						icon={<ShoppingCartIcon />}
						onClick={() => {
							push("/shoppinglist");
						}}
					/>
				</BottomNavigation>
			</Box>
		</>
	);
};

export default FootBar;
