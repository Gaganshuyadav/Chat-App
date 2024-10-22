import { DataGrid} from "@mui/x-data-grid";
import { Box, Paper, Typography} from "@mui/material";

export default function Table( { heightByMsg, rows, columns, heading}) {
    
    return(
        <Box sx={{ padding:{xs:"0px 10px", md:"0px 30px"} }}>
          <Paper
          elevation={5}
                sx={{
                    width:"100%",
                    borderRadius:{xs:"0px", md:"5px"}
                }} 
            >
            <Typography sx={{
                            textAlign:"center", 
                            fontSize:{xs:"20px", md:"30px"}, 
                            marginTop:{ xs:"20px",md:"12px"}, 
                            padding:{xs: "40px 0px 10px 0px", md:"12px 0px"},
                        }}>
                        { heading}
            </Typography>
            
            <DataGrid 
              rows={ rows}
              columns={ columns}
              rowHeight={ heightByMsg ? 150 : 0}
              sx={{
                height:{ xs:"93vh", md:"85vh"},
                color:"black",
                border:"none",
                margin:"0px auto",
                padding:"5px 10px",
                width:{xs:"100%", md:"92%"},
                ".table-header":{
                    backgroundColor:"black",
                    color:"white",
                    "&:hover":{
                        backgroundColor:"rgba(0, 0, 0, 0.84)",
                    }
                },
                ".single-cell":{
                    color:"black",
                },
                }}
            /> 
          </Paper>
        </Box>
    )
}