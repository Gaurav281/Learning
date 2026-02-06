import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResourceCard from "../components/ResourceCard";
import api from "../services/api";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const res = await api.get("/resources");
      setResources(res.data);
    };

    fetchResources();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">
        <div className="container py-16">
          {/* Header */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">
              GATE Preparation Resources
            </h2>
            <p className="mt-3 text-slate-600">
              Carefully curated test series and study resources designed
              strictly as per the latest GATE syllabus.
            </p>
          </div>

          {/* Resource Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {resources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>

          {resources.length === 0 && (
            <p className="mt-12 text-slate-600">
              Please Wait ...
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Resources;
