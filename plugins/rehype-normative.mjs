/**
 * rehype-normative
 *
 * Renders RFC-2119 style keywords as styled tokens, everywhere, without the
 * author having to reach for a component. Auditability depends on normative
 * force being visible at a glance, so this runs on every page.
 *
 *   MUST / MUST NOT / REQUIRED / SHALL   → gold
 *   SHOULD / SHOULD NOT / RECOMMENDED    → jade
 *   NEVER / MUST NEVER                   → clay
 *   MAY / OPTIONAL                       → dim
 *
 * Only matches ALL-CAPS occurrences in prose text nodes. Code, pre, and any
 * element that already carries a `data-no-normative` attribute are skipped, so
 * `MUST` inside a JSON schema stays plain.
 */

const CLASSES = {
  MUST: 'must',
  'MUST NOT': 'never',
  'MUST NEVER': 'never',
  REQUIRED: 'must',
  SHALL: 'must',
  'SHALL NOT': 'never',
  SHOULD: 'should',
  'SHOULD NOT': 'should-not',
  RECOMMENDED: 'should',
  'NOT RECOMMENDED': 'should-not',
  NEVER: 'never',
  MAY: 'may',
  OPTIONAL: 'may',
};

// Longest-first so "MUST NOT" wins over "MUST".
const KEYWORDS = Object.keys(CLASSES).sort((a, b) => b.length - a.length);
const PATTERN = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');

const SKIP = new Set(['code', 'pre', 'kbd', 'samp', 'script', 'style', 'a']);

export default function rehypeNormative() {
  return (tree) => {
    walk(tree, false);
  };
}

function walk(node, skipping) {
  if (!node || !Array.isArray(node.children)) return;

  const nextSkipping =
    skipping ||
    (node.type === 'element' &&
      (SKIP.has(node.tagName) || node.properties?.dataNoNormative !== undefined));

  const out = [];
  let changed = false;

  for (const child of node.children) {
    if (!nextSkipping && child.type === 'text' && PATTERN.test(child.value)) {
      PATTERN.lastIndex = 0;
      out.push(...split(child.value));
      changed = true;
    } else {
      walk(child, nextSkipping);
      out.push(child);
    }
  }

  if (changed) node.children = out;
}

function split(value) {
  const parts = [];
  let last = 0;
  PATTERN.lastIndex = 0;
  let match;

  while ((match = PATTERN.exec(value)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', value: value.slice(last, match.index) });
    }
    const word = match[0];
    parts.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['kw', `kw-${CLASSES[word]}`] },
      children: [{ type: 'text', value: word }],
    });
    last = match.index + word.length;
  }

  if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });
  return parts;
}
