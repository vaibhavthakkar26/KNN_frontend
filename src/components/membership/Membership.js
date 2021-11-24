import React from "react";
import './membership.css';
import sewa from "../../assets/image/kisspng-esewa-fonepay-pvt-ltd-logo-portable-network-grap-index-of-inheadline-public-assets-uploads-newsup-5b6df612161f19 1.png"
import khalti from "../../assets/image/Khalti_Digital_Wallet_Logo 1.png";
import Ips from "../../assets/image/connectipslogo 1.png";
import Ime from "../../assets/image/ime-pay 1.png";
import Footer from "../../components/footer/Footer";
import Header from "../../components/navbar/navbar";
function Membership(){
    return(
        <div>
            <Header />
            <div className="main_member_area">
                <div className="first_section_membership">
                    <h1>With Deposit</h1>
                    <p>**Please pay Rs.1200 [Rs.1000 as deposit Rs.200 as membership charge] in order become a member of KNN
                    community.</p>
                </div>
                <button className="checkout_payment_btn"><h1>Choose your payment option</h1></button>
                <div className="payment_platfrom">
                    <img src={sewa} alt="" width="180px" height="85px"/>
                    <img src={khalti} alt="" width="221px" height="120px"/>
                    <img src={Ips} alt=""  width="230px" height="66px"/>
                    <img src={Ime} alt="" width="163px" height="163px"/>
                </div>
                <div className="address_section">
                <input type="text" className="address_input" placeholder="Address to collect the books from*" /> 
                <input type="text" className="phone_input" placeholder="Your Phone Number*"/>
                </div>
                <button className="become_member_btn"><h3>Become a member</h3></button>
                <div className="member_text">
                <p>Do you have 3 Books?<span style={{color:"blue"}}>With Books</span></p>
                <a href="#"> <u> privacy policy </u>  and  <u> Terms conditions </u> </a> 
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Membership;