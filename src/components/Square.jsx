import React, { useEffect, useState } from "react";

export default function Square({index,size, square, hoverSetter, hovers}) {
  const [isIlluminated, setIsIlluminated] = useState(false);
  useEffect(()=>setIsIlluminated(false), [size]) 
  return (
    <div
      key={`square-${index}`}
      id={`square-${index}`}
      onMouseEnter={(event) => {

        event.stopPropagation()
        if(hovers.find(hover=>hover.id===square.id)){
          const newHovers = hovers.filter(hover=>hover.id!==square.id)
          hoverSetter(newHovers)
        }else{
          hoverSetter([...hovers, square])
        }
        setIsIlluminated(!isIlluminated)}}
      style={{
        background: isIlluminated?'radial-gradient(circle, rgba(0,221,255,1) 0%, rgba(56,193,255,1) 2%, rgba(91,228,255,1) 100%)':"white",
        width: `${55-size*2}px`,
        height: `${55-size*2}px`,
        cursor: "pointer",
      }}
    />
  );
}
