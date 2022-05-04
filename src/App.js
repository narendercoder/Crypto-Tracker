import React from "react";
import "./App.css";
import {Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";
import {makeStyles} from "@material-ui/core"

const App = () => {

 
const useStyles = makeStyles(()=>({
    App:{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",

    }
}));
const classes = useStyles();
    return (
        <>
         <div className={classes.App}>
             <Header />
             <Routes>
             <Route path='/' element = {<Homepage/>} exact />
             <Route path='/coins/:id' element = {<CoinPage/>} />
             </Routes>
         </div>
         </>
    )
}
export default App;