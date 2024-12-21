import Image from 'next/image';

const UserCard = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
      <Image
        src={imageUrl || '/image/profile.png'}
        alt={name}
        width={400}
        height={400}
        className="object-cover w-24 h-24 mb-4 rounded-full"
      />
      <p className="text-lg font-semibold">{name}</p>
    </div>
  );
};

export default UserCard;
