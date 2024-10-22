import { Menu, MenuItem} from "@mui/material";

export default function FileMenu( { anchorEl, handler}){

    return(
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl}>
            <MenuItem onClick={handler}>hello</MenuItem>
            <MenuItem onClick={handler}>yes</MenuItem>
            <MenuItem onClick={handler}>no</MenuItem>
        </Menu>
    )
}