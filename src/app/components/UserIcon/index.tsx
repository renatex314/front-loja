import { FaUserAstronaut } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface UserIconProps extends React.ComponentProps<"div"> {
  className?: string;
}
const UserIcon = ({ className, ...props }: UserIconProps) => {
  return (
    <div
      className={twMerge(
        "w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center mx-auto my-auto",
        className
      )}
      {...props}
    >
      <FaUserAstronaut className="text-white w-[40%] h-[40%]" />
    </div>
  );
};

export default UserIcon;
