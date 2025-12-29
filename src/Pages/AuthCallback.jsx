import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";




const AuthCallback = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl();

      if (data.session) {
        // Email is confirmed and the user is logged in
        navigate('/dashboard')
      } else {
        // Something Went Wrong
        setError("Email Confirmation failed")
      }

      setChecking(false)
    }

    checkSession()
  }, [navigate] )

  if (checking) return (
    <div className="container flex-center gap-3 mx-auto w-full px-5 h-screen" >
    <div className="flex-center gap-1">
      <img src="images/email-icon.svg" alt="Email Icon" />
      <h3 className="text-yellow text-3xl font-semibold">Email Confirmation</h3>
      <div>
        <p className="text-white">Confirming Email</p>
      </div>
    </div>
    <a 
      href="https://mail.google.com"
      className="bg-yellow p-3 rounded-xl hover:bg-light animate skale"
      target="_blank"
      >
      Resend Email
    </a>

  </div>
  )
  if (error) return <p>{error}</p>
  return null
}
 
export default AuthCallback;