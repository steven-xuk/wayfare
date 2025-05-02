import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>Return to the <Link to="/">home page</Link>.</p>
        </div>
    );
}