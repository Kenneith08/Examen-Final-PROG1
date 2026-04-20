const slugify = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const truncate = (str, maxLength) => {
  if (str.length <= maxLength) return str;

  const truncated = str.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  const cutPoint = lastSpace > 0 ? lastSpace : maxLength;

  return str.substring(0, cutPoint) + '...';
};

const countWords = (str) => {
  const trimmed = str.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
};


const escapeHTML = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export { slugify, truncate, countWords, escapeHTML };
