
const Button = ({children}) => {
  return ( <button className="bg-yellow text-[#081023] skale animate hover:bg-light py-1 px-3 rounded-lg text-sm">
    { children }
  </button> );
}

export default Button;