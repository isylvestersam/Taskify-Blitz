import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return ( <div className="container flex-center gap-3 mx-auto w-full px-5 h-screen" >
    <div className="flex-center gap-1">
      <img src="images/not-found.png" alt="error image" />
      <h3 className="text-yellow text-5xl font-semibold">404 Error</h3>
      <p className="text-white">We couldn't find the page you're looking for</p>
    </div>
    <Link 
      to='/'
      className="bg-yellow p-3 rounded-xl hover:bg-light animate skale"
      >
      Go back to Homepage
    </Link>

  </div> );
}
 
export default NotFoundPage;