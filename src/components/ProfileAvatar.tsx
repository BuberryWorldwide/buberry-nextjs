import Image from "next/image";

type ProfileAvatarProps = {
  avatarPath: string;
};

export default function ProfileAvatar({ avatarPath }: ProfileAvatarProps) {
  if (!avatarPath) {
    return (
      <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-full text-2xl font-bold">
        ?
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden">
      <Image
        src={avatarPath}
        alt="Profile Avatar"
        width={96} // or your desired width
        height={96} // or your desired height
        className="rounded-full"
        unoptimized // This bypasses Next.js image optimization
      />
    </div>
  );
}
