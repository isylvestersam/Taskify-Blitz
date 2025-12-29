import { Link } from "react-router-dom";

const CheckEmail = () => {
  return ( <div className="container flex-center gap-3 mx-auto w-full px-5 h-screen" >
    <div className="flex-center gap-1">
      <img src="images/email-icon.svg" alt="Email Icon" />
      <h3 className="text-yellow text-3xl font-semibold">Confirm your Email Address</h3>
      <p className="text-white lg:w-[65%] text-center ">We’ve sent a confirmation email. Check your inbox and click the link to finish setting things up.</p>
    </div>
    <a 
      href="https://mail.google.com"
      className="bg-yellow p-3 rounded-xl hover:bg-light animate skale"
      target="_blank"
      >
      Go to Email App
    </a>

  </div> );
}
 
export default CheckEmail;