import Link from "next/link";
import AppIcon from "../../AppIcon";

const AppLogo = () => {
  return (
    <Link className="flex h-full items-center gap-3" href={"/"}>
      <AppIcon className="w-12 h-12 p-3 my-auto ml-2" />
      <p className="text-blue-500 font-extrabold italic text-xl select-none">
        RocketStore
      </p>
    </Link>
  );
};

export default AppLogo;
