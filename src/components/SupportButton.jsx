const TELEGRAM_SUPPORT_URL = "https://t.me/@Gatepreppro"; // replace

const SupportButton = () => {
  return (
    <a
      href={TELEGRAM_SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Support on Telegram"
      className="
        fixed bottom-6 right-6 z-[9999]
        group
      "
    >
      <div
        className="
          flex items-center justify-center
          w-12 h-12
          rounded-full
          bg-[#229ED9]
          shadow-lg
          hover:shadow-xl
          transition-all duration-300
          group-hover:w-auto
          group-hover:px-4
        "
      >
        {/* Telegram Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white shrink-0"
        >
          <path d="M9.04 15.12 8.9 19.4c.6 0 .86-.26 1.18-.58l2.84-2.7 5.88 4.3c1.08.6 1.86.28 2.14-1l3.88-18.2h.01c.34-1.6-.58-2.22-1.64-1.82L1.6 9.4C.04 10.02.06 10.9 1.32 11.3l4.72 1.48L17.3 5.5c.52-.32 1-.14.6.18Z" />
        </svg>

        {/* Text (desktop hover only) */}
        <span
          className="
            ml-2
            text-sm font-medium text-white
            opacity-0
            max-w-0
            overflow-hidden
            group-hover:opacity-100
            group-hover:max-w-[120px]
            transition-all duration-300
            hidden sm:block
          "
        >
          Support
        </span>
      </div>
    </a>
  );
};

export default SupportButton;
