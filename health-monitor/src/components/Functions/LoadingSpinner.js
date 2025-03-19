import { Spinner } from "react-bootstrap";
import { useLoading } from "../../context/LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
    <Spinner animation="border" variant="primary" />
  </div>
  );
};

export default LoadingSpinner;
