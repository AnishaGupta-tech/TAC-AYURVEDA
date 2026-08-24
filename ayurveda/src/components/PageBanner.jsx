import React from 'react';

// Reusable compact hero band for secondary/tool pages — mirrors the site's
// Ayurvedic banner treatment (see .page-banner in styles.css).
const PageBanner = ({ title, subtitle, image }) => {
  return (
    <div className="page-banner" style={{ backgroundImage: `url('${image}')` }}>
      <div className="page-banner-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageBanner;
