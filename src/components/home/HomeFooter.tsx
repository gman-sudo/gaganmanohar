"use client";

interface Site {
  name?: string | null;
  location?: string | null;
}

interface HomeFooterProps {
  site: Site | null;
}

export default function HomeFooter({ site }: HomeFooterProps) {
  const displayName = site?.name || "Gaganmanohar";

  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-white/25 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} {displayName}. All rights reserved.
        </div>

        <div className="flex items-center gap-5">
          {site?.location && <span>{site.location}</span>}

          {site?.location && (
            <span className="text-white/10">
              •
            </span>
          )}

          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}