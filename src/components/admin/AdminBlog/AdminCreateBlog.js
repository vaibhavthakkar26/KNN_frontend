import React, { useState } from 'react'
import Adminsidebar from "../Adminsidebar";
import "../Admin.css";
function AdminCreateBlog() {
    const [title,settitle]=useState('');
    const [subTitle,setsubTitle]=useState('');
    const [titleImage,settitleImage]=useState('');
    const [blogWritter,setblogWritter]=useState('');
    
    const createBlogHandler=()=>{
        console.log(title);
        console.log(subTitle);
        console.log(titleImage);
        console.log(blogWritter);
        console.log();
    }
    return (
        <div>
            <div className="admin_side_main">
            <Adminsidebar />
            <div className="MainDiv">
            <div class="Admin_creata_book_main">
                <div class="comman_creat_blog_class">
                <div class="create_bookName">
                    <div>
                    <label> Title </label>
                    </div>
                    <div>
                    <input
                        type="text"
                        placeholder="BookName"
                        onChange={(e) => settitle(e.target.value)}
                    />
                    </div>
                </div>
                <div class="create_bookName">
                    <div>
                    <label> Subtitle </label>
                    </div>
                    <div>
                    <input
                        type="text"
                        placeholder="BookName"
                        onChange={(e) => setsubTitle(e.target.value)}
                    />
                    </div>
                </div>
                </div>
                <div  class="comman_creat_blog_class">
                <div class="create_bookName">
                    <div>
                    <label> settitleImage </label>
                    </div>
                    <div>
                    <input
                        type="file"
                        placeholder="pages"
                        onChange={(e) => settitleImage(e.target.files)}
                    />
                    </div>
                </div>
                <div class="create_bookName">
                    <div>
                    <label> blogWritter </label>
                    </div>
                    <div>
                    <select onChange={(e)=>setblogWritter(e.target.value)}>
                        <option> Test </option>
                        <option> test </option>
                    </select>
                    </div>
                </div>
                </div>
                <div class="create_book_btn_area">
                    <button onClick={createBlogHandler} style={{background: "#00BD57",color:"white" ,width:"261px",height:"41px",border:"#00BD57",fontSize:"18px",fontWeight:"bold"}}> createbook</button>
                </div>
            </div>
            </div>
        </div>
            </div>
        )
    }

    export default AdminCreateBlog;
    