// dashboard/components/SEO.tsx
import Head from "next/head";
import { memo } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterHandle?: string;
  structuredData?: object;
}

const SEO = memo(({
  title = "Jean Richnerd Rantabaratrahjaga - Fullstack Developer",
  description = "Seorang Fullstack Developer dari SMK Telkom Malang. Memulai perjalanan sebagai developer di MokletDev, aktif membangun aplikasi dengan fokus pada performa dan skalabilitas.",
  keywords = "fullstack developer, web developer, react developer, node.js, javascript, typescript, portfolio, SMK Telkom Malang, MokletDev",
  ogImage = "/img/baratrahjaga.jpg",
  ogUrl = "https://yoursite.com",
  twitterHandle = "@baratrahjaga",
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes("Jean") ? title : `${title} | Jean Richnerd Rantabaratrahjaga`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jean Richnerd Rantabaratrahjaga",
    "jobTitle": "Fullstack Developer",
    "alumniOf": "SMK Telkom Malang",
    "worksFor": {
      "@type": "Organization",
      "name": "MokletDev"
    },
    "url": ogUrl,
    "image": ogImage,
    "sameAs": [
      "https://twitter.com/baratrahjaga",
      "https://linkedin.com/in/baratrahjaga",
      "https://github.com/baratrahjaga"
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jean Richnerd Rantabaratrahjaga" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Jean Richnerd Portfolio" />
      <meta property="og:locale" content="id_ID" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Performance & Preload */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData),
        }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Head>
  );
});

SEO.displayName = "SEO";

export default SEO;