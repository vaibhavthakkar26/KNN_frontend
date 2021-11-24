import  React from "react";
import "./Membershippop.css";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
function Membershippop(){
    return(
        <div>
            <Header/>
            <div className="main_member_pop">
                <div className="member_pop_up_section">
                <h1> JOIN THE COMMUNITY OF KNOWLEDGE </h1>
            <select className="select_member_popup">
                <option className="option_member_popup"> BECOME A MEMBER WITH BOOKS </option>
                <option className="option_member_popup"> BECOME A MEMBR  WITH DEPOSIT</option>
            </select>
        </div>
        </div>
        <Footer />
        </div>
    )
}

export default Membershippop;