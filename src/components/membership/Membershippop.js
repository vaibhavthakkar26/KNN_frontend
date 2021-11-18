import  React from "react";
import "./Membershippop.css";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
function Membershippop(){
    return(
        <div>
            <Header/>
            <div class="main_member_pop">
                <div class="member_pop_up_section">
                <h1> JOIN THE COMMUNITY OF KNOWLEDGE </h1>
            <select class="select_member_popup">
                <option class="option_member_popup"> BECOME A MEMBER WITH BOOKS </option>
                <option class="option_member_popup"> BECOME A MEMBR  WITH DEPOSIT</option>
            </select>
        </div>
        </div>
        <Footer />
        </div>
    )
}

export default Membershippop;