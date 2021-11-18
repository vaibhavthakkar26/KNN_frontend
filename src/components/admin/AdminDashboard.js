import axios from "axios";
import React, { useMemo, useEffect, useState } from "react";

import Adminsidebar from "./Adminsidebar";

function AdminDashboard() {
  return (
    <div className="admin_side_main">
      <Adminsidebar />
      <div className="MainDiv"></div>
    </div>
  );
}

export default AdminDashboard;
