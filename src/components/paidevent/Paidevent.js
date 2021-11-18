import React from "react";
import "./Paidevent.css";
import Header from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
function Paidevent(){
    return(
        <div>
            <Header/> 
            <div class="main_paid_event">
        <div class="section_main_paid">
            <div class="transfer_paid_event">
                <h2> This is a paid Event kindly transfer <span>Rs.200</span> to</h2>
            </div>
            <div class="transfer_id_paid_event">
                <h2> esewa/Khalti ID:<b> 9861446103</b></h2>
            </div>
            <div class="event_paid_fees_section">
                <h2> Click <span  class="paid_ok_block"> ok</span> and wait for the verfication Email after payment  </h2>
            </div>
            <div>
                <button class="ok_paid_event"> ok </button>
            </div>
        </div>
    </div>
    <Footer />
        </div>
    )
}
export default Paidevent;