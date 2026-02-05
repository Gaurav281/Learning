const Footer = () => {
  return (
    <footer className="border-t bg-slate-50 mt-20">
      <div className="container py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-semibold text-slate-900">GatePrepPro</h3>
          <p className="text-sm text-slate-600 mt-2">
            Trusted GATE preparation resources.
          </p>
        </div>

        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} GatePrepPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
