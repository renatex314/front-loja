import { IoIosRocket } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface AppIconProps {
  className: string;
}
const AppIcon = ({ className }: AppIconProps) => {
  return (
    <div
      className={twMerge("h-28 w-28 rounded-full bg-blue-500 p-7", className)}
    >
      <IoIosRocket className="h-full w-full text-white" />
    </div>
  );
};

export default AppIcon;
