import clsx from "clsx";
import { useState } from "react";

export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type AvatarProps = {
  size?: AvatarSize;
  alt?: string;
  src: string;
  loading?: "eager" | "lazy";
};

const avatarSizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32",
  "3xl": "w-40 h-40",
  "4xl": "w-52 h-52",
};

// Helper function to get initials from a name string
const getInitials = (name?: string): string => {
  if (!name) return "?";
  const words = name.trim().split(/\s+/);
  if (words.length === 0 || words[0] === "") return "?";
  const firstInitial = words[0][0];
  const lastInitial = words.length > 1 ? words[words.length - 1][0] : "";
  return (firstInitial + lastInitial).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  alt,
  src,
  loading,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = getInitials(alt);
  const sizeClass = avatarSizeClasses[size];

  return imageError || !src ? (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-gray-300 text-gray-700",
        sizeClass
      )}
      title={alt}
    >
      <span className="font-medium leading-none">{initials}</span>
    </div>
  ) : (
    <img
      alt={alt ?? "Avatar"}
      draggable="false"
      src={src}
      loading={loading}
      onError={handleImageError}
      className={clsx("rounded-full object-cover object-center", sizeClass)}
    />
  );
};

export default Avatar;
