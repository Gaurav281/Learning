import { useNavigate } from "react-router-dom";

const TestPackCard = ({ pack, purchased }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-slate-900">
        {pack.title}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {pack.description}
      </p>

      {/* Price */}
      <div className="mt-4">
        {pack.discountPercent > 0 ? (
          <>
            <span className="line-through text-slate-400 text-sm">
              ₹{pack.price}
            </span>
            <span className="ml-2 text-xl font-semibold text-green-600">
              ₹{pack.finalPrice}
            </span>
          </>
        ) : (
          <span className="text-xl font-semibold text-blue-600">
            ₹{pack.price}
          </span>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() =>
          purchased
            ? navigate(`/test-series/pack/${pack._id}`)
            : navigate(`/payment/${pack._id}`)
        }
        className={`w-full mt-6 py-2 rounded text-white ${
          purchased ? "bg-green-600" : "bg-blue-600"
        }`}
      >
        {purchased ? "Access Pack" : "Buy Now"}
      </button>
    </div>
  );
};

export default TestPackCard;
