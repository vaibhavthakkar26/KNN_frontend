import React from 'react'
import { useEffect, useState } from "react";
function Admin_createDiscuss() {
    const [topic, settopic] = useState("");
    const [details, setdetails] = useState("");
    const [titleimage, settitleimage] = useState("");
    const createHandele=()=>{
        console.log("title",topic);
        console.log("subTitle",details);
        console.log("description",titleimage);
    }
    return (

        <div>
            <div class="main_div_discuss_admin">
                <div class="topic">
                    <label>Topic</label>
                    <input type="text" placeholder="Topic" 
                    onChange={(e) => settopic(e.target.value)}/>
                </div>
                <div class="details">
                    <label>Details</label>
                    <input type="text" placeholder="Details" 
                    onChange={(e) => setdetails(e.target.value)}/>
                </div>
                <div class="title_image">
                    <label>Title Image</label>
                    <input type="file" placeholder="Title Image" 
                    onChange={(e) => settitleimage(e.target.value)}/>
                </div>

                <div class="btn_create_discussion">
                    <button onClick={createHandele}>Create Discussion</button>
                </div>
                <div class="btn_add_components">
                    <button>Add Components</button>
                </div>
           </div>
        </div>
    )
}

export default Admin_createDiscuss
