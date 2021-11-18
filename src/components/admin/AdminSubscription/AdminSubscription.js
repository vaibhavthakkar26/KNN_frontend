import React,{useEffect} from 'react'
import Adminsidebar from "../Adminsidebar";
import 'jquery/dist/jquery.min.js';
import deletesvg from "../../../assets/image/delete.svg";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from "jquery";
function AdminSubscription() {
    useEffect(()=>{
        $(document).ready(function () {
            $("#example").DataTable();
          });
    })
    return (
        <div>
            <div className="admin_side_main">
                <Adminsidebar />
                <div className="MainDiv">
                <table id="example" class="cell-border stripe" style={{textAlign:"center"}}>
                <thead>
                 <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>type</th>
                <th>price</th>
                {/* <th><img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/4a90e2/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png" alt="" width="30" height="30"/></th> */}
                <th> <img src={deletesvg} alt="" width="30" height="30"/> </th>
              </tr>
            </thead>
            <tbody>
                    <tr class="table-success">
                      <td> hello </td>
                      <td> hello </td>
                      <td> hello </td>
                      <td> hello </td>
                      <td> hello </td>
                      <td> hello </td>
                    </tr>
            </tbody>
          </table>
                </div>
            </div>  
        </div>
    )
}

export default AdminSubscription
