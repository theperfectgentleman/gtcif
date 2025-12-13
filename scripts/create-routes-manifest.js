const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', '.next');
const manifestPath = path.join(distDir, 'routes-manifest.json');

if (!fs.existsSync(distDir)) {
  console.error('Missing .next directory; run "npm run build" first.');
  process.exit(1);
}

if (fs.existsSync(manifestPath)) {
  console.log('routes-manifest.json already exists; no action needed.');
  process.exit(0);
}

const manifest = {
  version: 5,
  pages404: true,
  basePath: "",
  redirects: [],
  rewrites: {
    beforeFiles: [],
    afterFiles: [],
    fallback: []
  },
  headers: [],
  dynamicRoutes: [],
  staticRoutes: [],
  dataRoutes: [],
  i18n: null
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Created fallback .next/routes-manifest.json');
