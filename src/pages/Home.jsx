import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-slate-50">
        <div className="container py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Crack GATE with Confidence
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Premium GATE test series and curated resources designed by experts.
            Trusted by serious aspirants.
          </p>

          <Link
            to="/resources"
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container py-16 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="font-semibold text-slate-900">Exam-Focused</h3>
          <p className="text-sm text-slate-600 mt-2">
            Designed strictly as per latest GATE syllabus.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Expert Curated</h3>
          <p className="text-sm text-slate-600 mt-2">
            Prepared by experienced educators and toppers.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Secure Access</h3>
          <p className="text-sm text-slate-600 mt-2">
            Resources available only to verified users.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
