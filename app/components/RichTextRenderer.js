import sanitizeHtml from 'sanitize-html';

export default function RichTextRenderer({ content }) {
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: [
      'p',
      'b',
      'i',
      'strong',
      'em',
      'a',
      'ul',
      'ol',
      'li',
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'span',
    ],
    allowedAttributes: {
      a: ['href', 'target'],
      img: ['src', 'alt', 'width', 'height'],
      span: ['style'],
      '*': ['style'],
    },
    allowedStyles: {
      '*': {
        color: [/^#[0-9a-fA-F]{3,6}$/, /^rgb\(/, /^rgba\(/],
        'font-size': [/^\d+(?:px|em|%)$/],
        'font-weight': [/^bold|normal|lighter|[1-9]00$/],
        'text-align': [/^left|right|center|justify$/],
        'font-style': [/^italic|normal$/],
      },
    },
  });

  return (
    <div
      className="w-full p-6 mx-auto prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
