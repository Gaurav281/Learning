import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentSubmitted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="bg-white border rounded-2xl p-10 max-w-md text-center shadow-sm">
          <h1 className="text-2xl font-bold text-green-600">
            Payment Submitted Successfully
          </h1>

          <p className="mt-4 text-slate-700">
            Your payment proof has been received and is under verification.
          </p>

          <p className="mt-2 text-slate-600">
            You will receive access shortly after approval.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Redirecting to dashboard...
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentSubmitted;
