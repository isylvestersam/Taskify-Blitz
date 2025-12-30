

const IconCube = ( { image, gradientColor, shadowColor } ) => {
  return ( <div className= {`bg-linear-to-br ${gradientColor} shadow-lg ${shadowColor} h-11 w-11 flex-center rounded-xl`}  >
    <img src={image} alt="" />
  </div> );
}
 
export default IconCube;