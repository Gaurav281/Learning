import { Link } from "react-router-dom";
import { generatePoster } from "../utils/generatePoster";

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src={
          resource.previewImage?.trim()
            ? resource.previewImage
            : generatePoster(resource.title)
        }
        alt={resource.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-5">
        <h3 className="font-semibold text-slate-900 line-clamp-2">
          {resource.title}
        </h3>

        {/* Price */}
        <div className="mt-3">
          {resource.discountPercent > 0 ? (
            <div>
              <span className="text-sm line-through text-slate-400">
                ₹{resource.price}
              </span>
              <span className="ml-2 text-lg font-semibold text-green-600">
                ₹{resource.finalPrice}
              </span>
              <span className="ml-2 text-xs text-green-600">
                ({resource.discountPercent}% OFF)
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-blue-600">
              ₹{resource.price}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Link
            to={`/resource/${resource._id}`}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
