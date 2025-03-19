import React, { useEffect, useState } from 'react'
import Navbar from "./Functions/Navbar";





const Prediction = (authUser) => {




  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const PredUrl = 'https://health-monitor-pred.streamlit.app/ ';
  return (
    <div style={{ width: '100%', height: '600px' }}>


      <iframe
        title="Prediction"
        src={PredUrl}
        width="100%"
        height="127%"

        style={{ border: 'none' }}
      ></iframe>

    </div>
  )
}

export default Prediction;
