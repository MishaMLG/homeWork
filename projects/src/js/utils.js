const UNSAFE_CHARS_RE = /<|>\/|'|\u2028|\u2029/g;

const ESCAPED_CHARS = {
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '\\u0027;',
   '</': '\\u002F',
   '\u2028': '\\u2028',
   '\u2029': '\\u2029'
};

const EscapeUnsafeChars = (unsafeChar) => ESCAPED_CHARS[unsafeChar];

export function sanitize(string) {
   return string && string.replace(UNSAFE_CHARS_RE, EscapeUnsafeChars)
}