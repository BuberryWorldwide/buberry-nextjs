import Image from "next/image";
import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";

export default function ProfileAvatar({ avatarPath }: { avatarPath: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarPath) return;
  
    console.log("Avatar Path:", avatarPath);
  
    // ✅ Use the public URL instead of signed URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(avatarPath);
  
    if (data?.publicUrl) {
      setImageUrl(data.publicUrl);
    } else {
      console.error("Failed to retrieve public URL");
    }
  }, [avatarPath]);
  

  return (
    <div className="relative w-24 h-24 mx-auto">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profile Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
      )}
    </div>
  );
}
