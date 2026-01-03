

const TimelineTag = ( { image, title, subtitle } ) => {
  // Image, Title, Subtitle

  return ( <div className="flex gap-2 items-center">
    <div className="bg-amber-500 w-fit p-2 rounded-lg">
      <img src={image} alt="" className="w-4" />
    </div>
    <div>
      <h3 className="text-amber-400 font-medium">{title}</h3>
      <p className="text-slate-400 text-xs">{subtitle}</p>
    </div>
  </div> );
}
 
export default TimelineTag;