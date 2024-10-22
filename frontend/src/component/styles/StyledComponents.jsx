import { styled, } from "@mui/material";
import { Link} from "react-router-dom";

//admin panel dashboard input
export const Input = styled("input")`
    padding: 1rem 0.6rem 1rem 1.2rem ;
    margin-left: 2vw;
    background-color: rgba(0, 0, 0, 0.24);
    color:black;
    font: 1rem 600 "Roboto";
    border-radius:25px;
    border:none;
    outline:none;
    letter-spacing:1px;
  
    
    @media (min-width:0px) and (max-width:800px){
        font-size:0.8rem;
        width:160px;
        padding: 0.9rem 0.9rem 0.9rem 1.2rem ; 
        margin-left:1vw;
    }
`;

export const ButtonS = styled("button")`
    color:white;
    background-color:black;
    font-family:"Roboto";
    letter-spacing:1px;
    border-radius:25px;
    padding: 0.9rem 1.6rem 0.9rem 1.6rem;
    font-size:1rem;
    font-weight:300;
    margin-left: 0.4rem;
    border:none;

    @media (min-width:0px) and (max-width:800px){
        font-size:0.8rem;
    }
`; 