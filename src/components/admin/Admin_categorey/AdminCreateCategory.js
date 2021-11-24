import React, { useState, useEffect } from "react";
import ErrorToast from "../../../comman/ErrorToast";
import SuccessToast from "../../../comman/SuccessToast";
import CategoryService from "../../../services/category.service";
import CommanService from "../../../services/comman.service";
import Adminsidebar from "../Adminsidebar";

function AdminCreateCategory(props) {
  const [name, setname] = useState("");
  const [type, setType] = useState("BOOK");
  const [createdBy, setCreatedBy] = useState("");
  useEffect(() => {
    const doFetch = async () => {
      const token = localStorage.getItem("accessToken");
      if (token === null || token === undefined) {
        props.history.push(`/`);
      } else {
        const decodetoken = await CommanService.decodeJWTToken(token);
        if (decodetoken.Role !== "Platform Admin") {
          props.history.push(`/`);
        } else {
          setCreatedBy(parseInt(decodetoken.id));
        }
      }
    };
    doFetch();
  }, []);

  const onCreate = async () => {
    const createCategory = await CategoryService.createCategory(
      name,
      type,
      createdBy
    );
    if (createCategory.status === 200) {
      SuccessToast(createCategory.data.message);
      props.history.push(`/admincategorey`);
    } else {
      ErrorToast(createCategory.data.message);
    }
  };
  return (
    <div>
      <div className="admin_side_main">
        <Adminsidebar />
        <div className="MainDiv">
          <div class="create_category_admin_main">
            <select
              placeholder="type"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="BOOK"> BOOK </option>
              <option value="DISCUSSION"> DISCUSSION </option>
            </select>
            <div class="create_cat_name_area">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setname(e.target.value)}
              />
              <button onClick={() => onCreate()}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateCategory;
