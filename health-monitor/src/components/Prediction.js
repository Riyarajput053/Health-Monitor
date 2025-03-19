import React, { useEffect } from 'react'
import Navbar from "./Functions/Navbar";
import LoadingSpinner from "./Functions/LoadingSpinner";  



import { useLoading } from "../context/LoadingContext";


const Prediction = ( authUser) => {
  const { loading, setLoading } = useLoading();
  const [iframeLoaded, setIframeLoaded] = useState(false);




  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
    const PredUrl = 'https://health-monitor-pred.streamlit.app/ ';
  return (
    <div style={{ width: '100%', height: '600px' }}>
      {!iframeLoaded && <LoadingSpinner />}
      
        <iframe
        title="Prediction"
        src={PredUrl}
        width="100%"
        height="127%"
        onLoad={() => setIframeLoaded(true)}
        style={{ border: 'none' }}
        ></iframe>
      
    </div>
  )
}

export default Prediction;
