import React from "react";
import './footer.css';
import facebook from "../../assets/image/facebook 1.png";
import instagram from "../../assets/image/Glossy-Instagram-logo-PNG 1.png";
import youtube from "../../assets/image/youtube 1.png";
import linkedin from "../../assets/image/linkedin 1.png";
import twitter from "../../assets/image/twitter 1.png";
import knnwhitelogo from "../../assets/image/knnlogoroundedback 1.png";
function Footer(){
    return(
        <div class="footer_main">
            <div class="footer_manisection">
        <div class="footer_section">
            <div class="footer_section_one">
                <div class="Feedback">
                    <img src={knnwhitelogo} alt=""/>
                </div>
                <div class="knn_feedback_section">
                    Lorem ipsum dolor sit amet, 
                    adipiscing elit, sed do eiusmod  
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                </div>
                <div class="social_media_part">
                    <h1> Follow us</h1>
                    <div class="social_media">
                        <img src={facebook} alt=""/>
                        <img src={instagram} alt=""/>
                        <img src={youtube} alt=""/>
                        <img src={linkedin} alt=""/>
                        <img src={twitter} alt=""/>
                    </div>
                </div>
            </div>
            <div class="footer_section_second">
                <div class="become_member"><h1> BECOME A MEMBER </h1></div>
                <div class="member_ship_step">
                    <button class="deposit_btn"> with books </button>
                    <h1 class="_or"> OR</h1>
                    <button class="deposit_btn"> with Deposit </button>
                </div>
                <div class="book_OR_deposit">
                    <div class="main_categories_list">
                        <h1 class="book_cat"> Book categories</h1>
                             <div class="newspaper">
                                 {/* <!-- loop start here --> */}
                                <h3>Action </h3>
                                <h3>Thriller</h3>
                                <h3>Action</h3>
                                <h3>Thriller</h3>
                            </div> 
                    </div> 
                    <div class="QUick_links">
                        <h1> Qucik links </h1>
                        <li> About Us </li>
                        <li> Contact Us</li>
                        <li> Become a Member </li>
                        <li> Discussion Forum </li>
                        <li> FAQs</li>
                        <li> sign up </li>
                        <li> Login</li>
                        <li> career</li>
                        <li> Event </li>
                    </div>
                </div> 
            
    
        </div>
        <div>
            {/* <!-- map  --> */}
            <div class="loction_">
                <h2> our office </h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28466.591861954203!2d85.27517357382834!3d27.69491079631805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19609a452e55%3A0x37440e12a6d2fe84!2sGanesh%20Mandir%2C%20Tyanglaphat!5e0!3m2!1sen!2sin!4v1628932729324!5m2!1sen!2sin" width="251" height="101" style={{border:"0",borderRadius:"15px"}} allowfullscreen="" loading="lazy"/>
            </div>

            <div class="about_section">
                <div>
                    {/* <!-- icon --> */}
                    <div class="footer_icon"> </div>
                    <div>
                        <p>9861-446-103</p>
                    </div>
                    <div class="footer_icon"> </div>
                    <div>
                        <p> Kathmandu,nepal</p>
                    </div>
                    <div class="footer_icon"> </div>
                    <div>
                        <p> info@knnepal </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Footer