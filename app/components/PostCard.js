import Link from 'next/link';
import CleanContent from './CleanContent';

const PostCard = ({ title, content, author, slug }) => {
  return (
    <div className="h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">
          <Link href={`/post/${slug}`} className="hover:text-[#4c24e5]">
            {title}
          </Link>
        </h2>
        <div className="mb-4 text-gray-700">
          <CleanContent content={content} maxLength={100} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {author}</span>
          <Link
            href={`/user/post/${slug}`}
            className="text-sm font-semibold text-[#4c24e5] hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
