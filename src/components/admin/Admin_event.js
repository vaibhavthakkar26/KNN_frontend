import axios from "axios";
import React, { useMemo ,useEffect,usestate} from "react";
import Tablecontainer from "./Tablecontainer";



function Adminevent(){
    useEffect(()=>{
        
    })
    const columns =useMemo(
        ()=>[
            {
                Header:"NO",
            },
            {
                Header:"Title",
            },
            {
                Header:"StartAt",
            },
            {
                Header:"EndAt",
            },
            {
                Header:"Status",
            },
            {
                Header:"Edit",
            },
            {
                Header:"Delete",
            }

        ]
    )
    return(
        <div class="admin_side_main">

            <Tablecontainer  columns={columns}/>
        </div>
    )
}

export default Adminevent;