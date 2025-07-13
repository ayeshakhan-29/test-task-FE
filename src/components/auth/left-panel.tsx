interface LeftPanelProps {
  type: "signup" | "login";
}

export default function LeftPanel({ type }: LeftPanelProps) {
  const content = {
    signup: {
      heading: "Start Optimizing Smarter",
      subtext:
        "Gain instant insights into your website's structure, performance, and link health.",
    },
    login: {
      heading: "Continue Where You Left Off",
      subtext:
        "Re-analyze pages, view results, and keep improving your site's performance.",
    },
  };

  return (
    <div className="relative hidden md:flex md:w-1/2 bg-transparent p-8 flex-col justify-between">
      <div className="text-white">
        <div className="text-semibold text-xl font-light flex items-center gap-2">
          <span className="uppercase tracking-widest">ANALYZE YOUR WEB</span>
          <div className="flex-grow border-b border-white/50"></div>
        </div>
        <p className="text-sm italic text-white mt-2">
          "The best-performing websites are always under analysis."
        </p>
      </div>
      <div className="text-white">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium mb-2 leading-tight text-nowrap">
          {content[type].heading}
        </h1>
        <p className="text-lg font-light max-w-sm">{content[type].subtext}</p>
      </div>
    </div>
  );
}
