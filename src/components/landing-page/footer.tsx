import Link from "next/link";

 export const contact = "6285106655664"
export default function Footer() {
  return (
    <footer className="border-t backdrop-blur-md bg-gradient-to-b from-[#800000] to-black border-b border-white/10 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Fruit Supplier</h3>
            <p className="text-sm text-muted-foreground">
              Menghubungkan supplier pada instansi resmi, mengelola dengan
                system management yang efisien dan efektif.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/Pengembang"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Bantuan</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/Pengembang"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Pengembang
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Kontak</h3>
            <address className="not-italic text-sm text-muted-foreground">
              Jean Richnerd Rantabaratrahjaga
              <br />
              Malang, Jawa Timur
            </address>
          </div>
        </div>

        <div className="pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Baratrahjaga . All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
