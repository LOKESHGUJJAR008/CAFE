/**
 * Image helper for home page sections
 * Auto-detects images using import.meta.glob in:
 * - src/assets/images/home/ (files hero, story, atmosphere with extension webp, jpg, jpeg, png)
 * - src/assets/images/specials/ (<slug>.webp etc.)
 * - src/assets/images/gallery/ (<slug>.webp etc.)
 *
 * Each function returns the image URL, or undefined if the file does not exist.
 */

/**
 * SLUG RULE:
 * - lowercase
 * - strip accents (Café -> cafe)
 * - "&" becomes " and "
 * - remove everything except letters, digits, spaces, hyphens
 * - spaces to single hyphens (e.g. "Royal Bean Signature Coffee" -> royal-bean-signature-coffee)
 */
export function toSlug(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (Café -> Cafe)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '') // remove everything except letters, digits, spaces, hyphens
    .trim()
    .replace(/\s+/g, '-') // spaces to single hyphens
    .replace(/-+/g, '-'); // consolidate multiple hyphens
}

// Auto-detect glob maps with eager import
const homeImagesGlob = import.meta.glob(
  '../assets/images/home/*.{webp,jpg,jpeg,png,WEBP,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
);

const specialsImagesGlob = import.meta.glob(
  '../assets/images/specials/*.{webp,jpg,jpeg,png,WEBP,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
);

const galleryImagesGlob = import.meta.glob(
  '../assets/images/gallery/*.{webp,jpg,jpeg,png,WEBP,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
);

/**
 * Helper to match slug against file basename in a glob map
 */
function findInGlob(globMap, slugOrName) {
  if (!slugOrName) return undefined;
  const target = toSlug(slugOrName);
  for (const [path, mod] of Object.entries(globMap)) {
    const filename = path.split('/').pop() || '';
    const dotIdx = filename.lastIndexOf('.');
    const baseName = dotIdx !== -1 ? filename.substring(0, dotIdx) : filename;
    if (toSlug(baseName) === target) {
      return mod;
    }
  }
  return undefined;
}

/**
 * Returns image URL for home sections (hero, story, atmosphere) or undefined
 */
export function getHomeImage(name) {
  return findInGlob(homeImagesGlob, name);
}

/**
 * Returns image URL for special dishes by slug or dish name, or undefined
 */
export function getSpecialImage(slug) {
  return findInGlob(specialsImagesGlob, slug);
}

/**
 * Returns image URL for gallery items by slug or name, or undefined
 */
export function getGalleryImage(slug) {
  return findInGlob(galleryImagesGlob, slug);
}
