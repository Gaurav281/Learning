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

      <div className="container py-20 text-center">
        <h1 className="text-3xl font-semibold text-green-600">
          ✅ Payment Submitted
        </h1>

        <p className="mt-4 text-slate-600">
          Your payment proof has been received.
        </p>

        <p className="mt-2 text-slate-600">
          You will get access within <strong>10 minutes</strong> after
          verification.
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Redirecting to your profile in 5 seconds...
        </p>
      </div>

      <Footer />
    </>
  );
};

export default PaymentSubmitted;
