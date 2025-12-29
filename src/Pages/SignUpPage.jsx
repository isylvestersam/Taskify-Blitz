import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";



const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [isHidden, setHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate()


  function handleToggleHidden() {
    setHidden(prev => !prev)
  }

  const validateField = (field, value) => {
  let error = "";
  if (field === "email") {
    if (!value) error = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
  }
  if (field === "password") {
    if (!value) error = "Password is required";
    else if (value.length < 6 || value.length > 24)
      error = "Password must be between 6 and 24 characters";
  }
  setFormErrors(prev => ({ ...prev, [field]: error }));
};

  const handleSignUp = async (e) => {
  e.preventDefault();

  const errors = {
    email: !email ? "Email is required" 
      : !/\S+@\S+\.\S+/.test(email) ? "Email is invalid" 
      : "",
    password: !password ? "Password is required" 
      : password.length < 6 || password.length > 24 
      ? "Password must be between 6 and 24 characters" 
      : ""
  };

  setFormErrors(errors);

  if (errors.email || errors.password) return;

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setFormErrors(prev => ({ ...prev, server: error.message }));
    } else {
      console.log("Signed Up:", data);
      // Optional: redirect to login page or dashboard
      navigate("/check-email");
    }
  } catch (err) {
    setFormErrors(prev => ({ ...prev, server: "Unexpected error" }));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container flex-center gap-3 mx-auto w-full lg:w-[40%] xl:w-[30%] px-12 h-screen">
    <div className="flex-center gap-2 mb-12">
      <img src="images/logo.svg" alt="Taskify Logo" />
      <h3 className="text-yellow text-4xl font-semibold">Taskify Blitz</h3>
    </div>

    <form
      onSubmit={handleSignUp}
      className="text-white w-full flex flex-col gap-5">
      {/* Email Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="email" className="mb-1">Email</label>
        <div id="email" className={`bg-gray w-full flex justify-between gap-3 rounded-sm py-2 px-3 focus-within:outline-2 focus-within:outline-yellow ${ formErrors.email ? 'outline-2 outline-red-500' : ''}`} >
          <input
          value={email}
          onChange={e => { setEmail(e.target.value); validateField("email", e.target.value); }}
            type="text" placeholder="Please enter your email" className="w-full placeholder:text-[#484848] focus:outline-none"
          />
          <img src="images/mail.svg" alt="mail icon" />
        </div>
        {
          formErrors.email && (
            <p className="text-xs mt-1 text-red-500 italic ml-auto">{formErrors.email}</p>
          )
        }
      </div>

      {/* Password Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="password" className="mb-1">Password</label>
        <div id="password" type='password' className={`bg-gray w-full flex justify-between gap-3 rounded-sm py-2 px-3 focus-within:outline-2 focus-within:outline-yellow ${ formErrors.password ? 'outline-2 outline-red-500' : ''}
          `}>
          <input type={isHidden ? 'password' : 'text'}
          value={password}
          onChange={e => { setPassword(e.target.value); validateField("password", e.target.value); }}
            placeholder="Please enter your password" 
            className="w-full placeholder:text-[#484848] focus:outline-none"
            />
            
          {
            <button onClick={handleToggleHidden} type="button">
              <img src={
                isHidden ? 'images/eye-on.svg'
                : 'images/eye-off.svg'
              } alt="View Password" className="" />
            </button>
          }
        </div>
        {
          formErrors.password && (
            <p className="text-xs mt-1 text-red-500 italic ml-auto">{formErrors.password}</p>
          )
        }
      </div>

      {/* Show Server Errors */}
      {formErrors.server && (
        <p className="text-xs mt-1 text-red-500 italic">{formErrors.server}</p>
      )}

      <button
        disabled={loading}
        className="bg-yellow py-2 flex justify-center items-center gap-2 w-full rounded-md text-[#081023] skale animate hover:bg-light">
        {
          loading && (
            <svg className="w-5 h-5 animate-spin text-[#081023]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
            </svg>
          )
        }
        {
          loading ? 'Signing Up' : 'Sign Up'
        }
      </button>
      <span className="flex gap-1 text-sm ml-auto">
        <p>Have an account?</p>
        <Link to='/login' className="underline text-yellow" >Sign In</Link>
      </span>
    </form>
  </div> 

   );
}
 
export default SignUpPage;