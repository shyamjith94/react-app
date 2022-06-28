import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>that page can not be found</p>
            <Link to='/'>BACK TO HOME..</Link>
        </div>
     );
}
 
export default NotFound;