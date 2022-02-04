import * as React from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandMore from "../expand-more/styled";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

const MyCardFooter = () => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<div>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					aria-expanded={expanded}
					aria-label="show more"
					onClick={handleExpandClick}
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse unmountOnExit in={expanded} timeout="auto">
				<CardContent>
					<Typography>recipe</Typography>
				</CardContent>
			</Collapse>
		</div>
	);
};
export default MyCardFooter;
