

const Tag = ( { label, textColor, bgColor, borderColor, hoverColor } ) => {
  return ( <button className={`w-fit text-xs py-0.5 px-2 rounded-lg border whitespace-nowrap shrink-0 ${textColor} ${borderColor} ${hoverColor} ${bgColor} `} >
    <p> {label} </p>
  </button> );
}
 
export default Tag;