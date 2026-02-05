import { Link } from "react-router-dom";
import { generatePoster } from "../utils/generatePoster";

const ResourceCard = ({ resource }) => {

  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={
          resource.previewImage?.trim()
            ? resource.previewImage
            : generatePoster(resource.title)
        }
        alt={resource.title}
        className="w-full h-44 object-cover"
      />


      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{resource.title}</h3>

        <div className="mt-3">
          {resource.discountPercent > 0 ? (
            <>
              <span className="text-sm line-through text-slate-400">
                ₹{resource.price}
              </span>
              <span className="ml-2 text-lg font-semibold text-green-600">
                ₹{resource.finalPrice}
              </span>
              <span className="ml-2 text-xs text-green-600">
                ({resource.discountPercent}% OFF)
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-blue-600">
              ₹{resource.price}
            </span>
          )}
        </div>

        <div className="mt-4">
          <Link
            to={`/resource/${resource._id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
