import { ClipLoader } from "react-spinners";
import { useLoading } from "../../context/LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <ClipLoader size={50} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
