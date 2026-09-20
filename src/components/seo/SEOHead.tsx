import React from 'react';
import { Helmet } from 'react-helmet-async';
import { clinicInfo } from '../../data/clinicInfo';
import { getLocalBusinessSchema } from '../../utils/schema';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical = 'https://drhashichiropractic.com',
  ogImage = 'https://drhashichiropractic.com/og-image.jpg',
}) => {
  const pageTitle = title
    ? `${title} | ${clinicInfo.name}`
    : `${clinicInfo.name} | Top Chiropractor in Electronic City, Bangalore`;

  const pageDescription =
    description ||
    `Dr Hashi Chiropractic in Electronic City, Bengaluru by Dr Shinto Thomas. Specializing in spinal alignment, neck pain, lower back pain, sciatica relief, and posture correction. Call +91 96450 10120.`;

  const schemaData = getLocalBusinessSchema();

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};
