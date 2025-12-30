import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthCallback = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (error) {
      setError(errorDescription || 'Email Confirmation Failed');
      setChecking(false)
      return
    }


    setInfoMessage(
      'Email verified successfully. Please log in to continue'
    )
    setChecking(false);
    setConfirmed(true)
  }, [] )

  

  return (
    <div className="container flex-center gap-3 mx-auto w-full px-5 h-screen lg:w-[40%]" >
    <div className="bg-[#0A132B] rounded-2xl  w-full h-[50%] flex-center gap-1">
      <img src="images/email-icon.svg" alt="Email Icon" />
      <h3 className="text-yellow  text-3xl font-semibold">Email Confirmation</h3>
      <div className="flex flex-row-reverse gap-1 items-center">
        {
          error && (
            <p className="text-red-500 w-[65%] mx-auto text-center"> {error} </p>
          )
        }
        { checking && (
            <span className="flex flex-row-reverse gap-2 items-center justify-center">
              <p className="text-white">Confirming Email Address </p>
                <svg className="w-7 h-7 animate-spin text-[#ffffff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                </svg>
            </span>
          )}
        {
          infoMessage !== '' ? ( <p className="text-white">{infoMessage}</p> )
          : null
        }
      </div>
      {confirmed && (
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="bg-yellow p-3 skale animate rounded-xl hover:bg-light my-4"
          >
            Continue to Login
          </button>
        )}
    </div>

  </div>
  )
}

export default AuthCallback;