import React from "react";
import './cartwithnoitem.css';
import Header from "../../components/navbar/navbar";
import  Specialevent from "../../comman/Specialevent";
import Footer from "../../components/footer/Footer";
function Cartwithnoitem (){
    return(
        
        <div>
            <Header />
            <div style={{textAlign:"center"}}>
                <div  className="cart_no_item">
                <h2> You don't have any items in your cart yet, <span style={{color:"#FFC106"}}> continue Exchanging.  </span></h2>
                </div>
                    
            </div>
            <Specialevent/>
            <Footer />
        </div>
    )
}

export default Cartwithnoitem;