import React, { Suspense } from "react";
import "./App.css";
import {Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import {makeStyles} from "@material-ui/core";

const Homepage = React.lazy(()=>import("./pages/Homepage"));
const CoinPage = React.lazy(()=>import("./pages/CoinPage"));

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
             <Header/>
             <Suspense fallback={<div>Loading...</div>}>
             <Routes>
             <Route path='/' element = {<Homepage/>} exact />
             <Route path='/coins/:id' element = {<CoinPage/>} />
             <Route path="*" element = {<Homepage/>}/>
             </Routes>
             </Suspense>
         </div>
         </>
    )
}
export default App;