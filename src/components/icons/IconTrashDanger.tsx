import { IconProps } from "types/types-icons";

export const IconTrashDanger: React.FC<IconProps> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2" />
    <rect
      x="4"
      y="4"
      width="48"
      height="48"
      rx="24"
      stroke="#FEF3F2"
      strokeWidth="8"
    />
    <path
      d="M32 22V21.2C32 20.0799 32 19.5198 31.782 19.092C31.5903 18.7157 31.2843 18.4097 30.908 18.218C30.4802 18 29.9201 18 28.8 18H27.2C26.0799 18 25.5198 18 25.092 18.218C24.7157 18.4097 24.4097 18.7157 24.218 19.092C24 19.5198 24 20.0799 24 21.2V22M26 27.5V32.5M30 27.5V32.5M19 22H37M35 22V33.2C35 34.8802 35 35.7202 34.673 36.362C34.3854 36.9265 33.9265 37.3854 33.362 37.673C32.7202 38 31.8802 38 30.2 38H25.8C24.1198 38 23.2798 38 22.638 37.673C22.0735 37.3854 21.6146 36.9265 21.327 36.362C21 35.7202 21 34.8802 21 33.2V22"
      stroke="#D92D20"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
