import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const BASE_URL = 'https://dariabrusnitsina.github.io/stardew-valley-checklist';
const DEFAULT_TITLE = 'Stardew Valley Checklist - Track Community Center Bundles Progress';
const DEFAULT_DESCRIPTION =
  'Interactive checklist application for tracking Stardew Valley Community Center ' +
  'bundles completion. Mark collected items, track progress, and achieve 100% completion!';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;
const DEFAULT_KEYWORDS = [
  'stardew valley',
  'checklist',
  'community center',
  'bundles',
  'farming',
  'progress tracker',
  'game guide',
  'stardew valley guide',
  'bundle tracker',
  'completion tracker',
].join(', ');

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  structuredData,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE.split(' - ')[0]}` : DEFAULT_TITLE;
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Stardew Valley Checklist" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
};
