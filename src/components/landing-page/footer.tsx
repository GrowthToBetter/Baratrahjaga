import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JR</span>
              </div>
              <span className="text-white font-medium">Baratrahjaga</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Fullstack Developer dari SMK Telkom Malang. Membangun solusi digital dengan teknologi modern dan
              pendekatan user-centric.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-white/60 hover:text-white text-sm transition-colors">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <address className="not-italic text-white/60 text-sm space-y-1">
              <p>Jean Richnerd Rantabaratrahjaga</p>
              <p>Malang, Jawa Timur</p>
              <p className="pt-2">
                <a href="https://wa.me/6281235667629" className="hover:text-white transition-colors">
                  +62 812 3566 7629
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {currentYear} Baratrahjaga. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs">Built with Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
