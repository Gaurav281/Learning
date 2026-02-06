import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t mt-24">
      <div className="container py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            GatePrep<span className="text-blue-600">Pro</span>
          </h3>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            GatePrepPro is a focused GATE preparation platform offering
            exam-oriented resources, test series, and digital learning tools
            designed for serious aspirants.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                to="/resources"
                className="text-slate-600 hover:text-slate-900"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-slate-600 hover:text-slate-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/payment"
                className="text-slate-600 hover:text-slate-900"
              >
                Payment & Access
              </Link>
            </li>
            <li>
              <a
                href="https://t.me/YOUR_SUPPORT_BOT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900"
              >
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Trust */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Trust & Support
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Secure UPI Payments</li>
            <li>Manual Verification</li>
            <li>Lifetime Access</li>
            <li>Email / Telegram Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} GatePrepPro. All rights reserved.
          </p>
          <p>Built for serious GATE aspirants</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
