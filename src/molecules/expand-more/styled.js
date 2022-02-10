import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const ExpandMore = styled(({ expand, ...props }) => <IconButton {...props} />)(
	({ theme, expand }) => ({
		transform: expand ? "rotate(180deg)" : "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	})
);

export default ExpandMore;
