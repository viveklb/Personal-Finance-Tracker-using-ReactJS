// AntV dependencies reference source maps that are absent from their published packages.
// Disable production source maps so CRA builds consistently locally and on Vercel CI.
process.env.GENERATE_SOURCEMAP = 'false';
require('react-scripts/scripts/build');
