import sanitizeHtml from 'sanitize-html';

const CleanContent = ({ content, maxLength }) => {
  const cleanContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const sanitizedContent = cleanContent(content);

  return (
    <p className="mb-4 text-gray-700">
      {maxLength && sanitizedContent.length > maxLength
        ? `${sanitizedContent.substring(0, maxLength)}...`
        : sanitizedContent}
    </p>
  );
};

export default CleanContent;
