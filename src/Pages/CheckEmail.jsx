import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

const CheckEmail = () => {
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const email = localStorage.getItem('pendingEmail')

  const resendEmail = async () => {
    if (!email) {
      setError('Email not Found Please sign up again')
      return
    }

    setResending(true)
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: 'http://localhost:5173/auth/callback'
      }
    });

    if (resendError) {
      setError(resendError.message);
    } else {
      setError('');
      setInfoMessage('Confirmation email resent. Please check your inbox.');
    }
  setResending(false)
  }



  return ( <div className="container flex-center gap-3 mx-auto w-full px-5 h-screen" >
    <div className="flex-center gap-1">
      <img src="images/email-icon.svg" alt="Email Icon" />
      <h3 className="text-yellow text-3xl font-semibold">Confirm your Email Address</h3>
      <p className="text-white lg:w-[65%] text-center ">We’ve sent a confirmation email. Check your inbox and click the link to finish setting things up.</p>
    </div>
    <div className="flex gap-3">
      <a 
      href="https://mail.google.com"
      className="bg-yellow p-3 rounded-xl hover:bg-light animate skale"
      target="_blank"
      >
      Go to Email App
    </a>
    <button
          onClick={resendEmail}
          disabled={resending}
          className="bg-transparent border border-[#99a1b5] text-[#99a1b5] p-3 rounded-xl hover:bg-light animate hover:text-gray"
        >
          <span className="flex flex-row-reverse items-center justify-center gap-1">
            {
              resending && (
                <div>
                  <svg className="w-5 h-5 animate-spin text-[#000000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                </svg>
                </div>
              )
              
            }
            <p>
              {
                resending ? 'Resending Email' : 'Resend Email'
              }
            </p>
          </span>
    </button>
    </div>

  </div> );
}
 
export default CheckEmail;