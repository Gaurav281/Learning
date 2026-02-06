import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-24 text-center">
          <span className="inline-block mb-4 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-1 rounded-full">
            India’s Focused GATE Preparation Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Prepare for GATE with <br className="hidden md:block" />
            Confidence, Clarity & Control
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            High-quality GATE test series, exam-focused resources, and
            performance-driven preparation tools — designed for serious
            aspirants who aim for top ranks.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/resources"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-md"
            >
              Explore Resources
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-8 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Login / Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST METRICS ================= */}
      <section className="bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">Exam-First</h3>
            <p className="mt-3 text-sm text-slate-600">
              Every resource strictly follows the latest GATE syllabus and exam
              pattern.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-900">Expert-Built</h3>
            <p className="mt-3 text-sm text-slate-600">
              Designed by subject experts, toppers, and experienced educators.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-900">Secure Access</h3>
            <p className="mt-3 text-sm text-slate-600">
              Verified login ensures protected content and serious learners only.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Why Students Trust Us
          </h2>

          <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
            Built with one goal — to help you crack GATE using structured,
            data-driven, and exam-relevant preparation.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h4 className="font-semibold text-slate-900">
                High-Quality Test Series
              </h4>
              <p className="text-sm text-slate-600 mt-3">
                Real GATE-level questions with detailed solutions and analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h4 className="font-semibold text-slate-900">
                Performance Analytics
              </h4>
              <p className="text-sm text-slate-600 mt-3">
                Identify strengths, weaknesses, and improve strategically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <h4 className="font-semibold text-slate-900">
                Focused Learning Environment
              </h4>
              <p className="text-sm text-slate-600 mt-3">
                No distractions. Only what matters for GATE success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-blue-600">
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-3xl font-bold">
            Start Your GATE Preparation Today
          </h2>

          <p className="mt-4 text-blue-100 max-w-xl mx-auto">
            Join serious aspirants preparing with discipline, structure, and
            clarity.
          </p>

          <Link
            to="/resources"
            className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
