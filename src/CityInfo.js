import React from 'react'

function CityInfo({val}) {
    return (
        <div className="weCard">
          <h1>{val.city}</h1>
          <h2>{val.main}</h2>
          <h3>min temp : {val.temp_min}</h3>
          <h3>max temp : {val.temp_max}</h3>
          <h3>loction : {val.loction}</h3>
        </div>
    )
}

export default CityInfo
