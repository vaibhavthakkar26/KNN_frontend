import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/index/Home";
import event from "./components/events_/Event";
import checkout from "./components/checkout/checkout";
import Membership from "./components/membership/Membership";
import cartwithnoitem from "./components/cart/Cartwithnoitem";
import Cart from "./components/cart/Cart";
import Paidevent from "./components/paidevent/Paidevent";
import Membershippop from "./components/membership/Membershippop";
import Memberwithbook from "./components/membership/Memberwithbook";
import Membershipwithdeposit from "./components/membership/Membershipwithdeposit";
import joincommunity from "./components/joincommunity/joincommunity";
import Forgotpassword from "./components/forgotpassword/Forgotpassword";
import restpassword from "./components/restpassword/Restpassword";
import editprofile from "./components/editprofile/EditProfile";
import myprofile from "./components/myprofile/Myprofile";
import Creatediscuss from "./components/Creatediscuss/Creatediscuss";
import Discussinside from "./components/discuss_inside/Discussinside";
import Blog from "./components/blog/Blog";
import BlogInside from "./components/blog/BlogInside";
import Book from "./components/Book/Book";
import Discuss from "./components/discuss/Discuss";
import Eventin from "./components/events_/Eventin";
import Bookin from "./components/Book/Bookin";
import Adminsidebar from "./components/admin/Adminsidebar";
import Adminevent from "./components/admin/AdmineventF/Admin_event";
import AdminDashboard from "./components/admin/AdminDashboard";
import Admin_CreateEvent from "./components/admin/AdmineventF/Admin_CreateEvent";
import Admineventdetails from "./components/admin/AdmineventF/Admin_event_details";
import AdminBlogList from "./components/admin/AdminBlog/AdminBlogList";
import AdminBookList from "./components/admin/AdminBook/AdminBookList";
import AdminDiscussion from "./components/admin/Admin_discuss/AdminDiscussion";
import AdminCategorey from "./components/admin/Admin_categorey/AdminCategorey";
// import AdminBlog from "./components/admin/admin_blog/AdminBlog";
import AdminBlogwriter from "./components/admin/AdminBlog/AdminBlogwriter";
import AdminCreateBlog from "./components/admin/AdminBlog/AdminCreateBlog";
import AdminCreateBook from "./components/admin/AdminBook/AdminCreateBook";
import AdminCreateBlogWriter from "./components/admin/AdminBlog/AdminCreateBlogWriter";
import AdminSubscription from "./components/admin/AdminSubscription/AdminSubscription";
import CkEditorexample from "./components/admin/CkEditorexample";
function App(props) {
  return (
    <Router>
      <div>
        <switch>
          <Route path="/event" exact component={event} />
          <Route path="/" exact component={Home} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/bookin" exact component={Bookin} />
          <Route path="/forgotpassword" exact component={Forgotpassword} />
          <Route path="/restpassword" exact component={restpassword} />
          <Route path="/editprofile" exact component={editprofile} />
          <Route path="/myprofile" exact component={myprofile} />
          <Route path="/Book" exact component={Book} />
          <Route path="/eventin" exact component={Eventin} />
          <Route path="/discussinside" exact component={Discussinside} />
          <Route path="/discuss" exact component={Discuss} />
          <Route path="/bloginside" exact component={BlogInside} />
          <Route path="/Creatediscuss" exact component={Creatediscuss} />
          <Route path="/membership" exact component={Membership} />
          <Route path="/membershippop" exact component={Membershippop} />
          <Route
            path="/membershipwithdeposit"
            exact
            component={Membershipwithdeposit}
          />
          <Route path="/memberwithbook" exact component={Memberwithbook} />
          <Route path="/joincommunity" exact component={joincommunity} />
          <Route path="/paidevent" exact component={Paidevent} />
          <Route path="/checkout" exact component={checkout} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/cartwithnoitem" exact component={cartwithnoitem} />
          <Route path="/login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          {/* admmin side */}
          {/* <Route path="/Admin" exact component={Adminsidebar}/>  */}
          <Route path="/admindashboard" exact component={AdminDashboard} />
          <Route path="/adminevent" exact component={Adminevent} />
          <Route path="/admineventcreate" exact component={Admin_CreateEvent} />
          <Route
            path="/admineventdetails"
            exact
            component={Admineventdetails}
          />
          <Route path="/adminbloglist" exact component={AdminBlogList} />
          <Route path="/adminbooklist" exact component={AdminBookList} />
          <Route path="/admincreatebook" exact component={AdminCreateBook} />
          <Route path="/admindiscussion" exact component={AdminDiscussion} />
          <Route path="/admincategorey" exact component={AdminCategorey} />
          <Route path="/adminblogwrite" exact component={AdminBlogwriter} />
          <Route path="/adminCreateblog" exact component={AdminCreateBlog} />
          <Route path="/createblogwriter" exact component={AdminCreateBlogWriter}/>
          <Route path="/adminsubscription" exact component={AdminSubscription}/>
          <Route path="/ckeditor" exact component={CkEditorexample}/>
          {/* <Route path="/" */}
        </switch>
      </div>
    </Router>
  );
}

export default App;
