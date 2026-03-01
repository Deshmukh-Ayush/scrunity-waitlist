import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, OG_IMAGE_URL } from "@/lib/seo";

/**
 * JSON-LD structured data for Organization and WebSite.
 * Helps search engines understand your brand and site for rich results.
 */
export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/scrunity-logo-light.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    image: OG_IMAGE_URL,
    potentialAction: {
      "@type": "JoinAction",
      target: {
        "@type": "EntryPoint",
        url: SITE_URL,
      },
      name: "Join the waitlist",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: OG_IMAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
    </>
  );
}
