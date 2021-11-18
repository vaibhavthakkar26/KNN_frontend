import React,{useState} from 'react'

function AdminCreateCategory() {
    const [name, setname] = useState('');
    return (
        <div>
            <div class="create_category_admin_main">
                <select placeholder="type"> 
                    <option> hello </option>
                    <option> hello </option>
                </select>
                <div class="create_cat_name_area">
                        <input type="text" placeholder="Name" onChange={(e)=>setname(e.target.value)}/>
                        {/* <button></button> */}
                </div>
            </div>  
        </div>
    )
}

export default AdminCreateCategory
