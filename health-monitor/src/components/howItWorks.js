import React from 'react'
import Navbar from './Functions/Navbar'
import { useLoading } from "../context/LoadingContext";


const howItWorks = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); 
  }, []);


  return (
    <div>

    </div>
  )
}

export default howItWorks
