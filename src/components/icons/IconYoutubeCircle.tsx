import { IconProps } from "types/types-icons";

export const IconYoutubeCircle: React.FC<IconProps> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z"
      fill="#FF0000"
    />
    <path d="M12 22L24 15.5001L12 9V22Z" fill="white" />
  </svg>
);
