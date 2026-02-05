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

      <div className="container py-14">
        <h2 className="text-2xl font-semibold text-slate-900">
          GATE Resources
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {resources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Resources;
