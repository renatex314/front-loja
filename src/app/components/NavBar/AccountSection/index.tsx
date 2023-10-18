import { authorization } from "@/core";
import { useTooltip } from "@/providers/TooltipProvider";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";

const AccountSection = () => {
  const router = useRouter();
  const accountIconRef = useRef<HTMLDivElement>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const openAccountPage = useCallback(() => {
    router.push("/account");
    setIsAccountMenuOpen(false);
  }, [router]);

  return (
    <div className="flex h-full ml-auto" ref={accountIconRef}>
      <div
        className="hover:scale-110 duration-100 cursor-pointer w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center my-auto mr-3"
        onClick={() => setIsAccountMenuOpen(true)}
        {...useTooltip("Minha conta")}
      >
        <FaUserAstronaut className="text-white" />
      </div>

      <Menu
        open={isAccountMenuOpen}
        anchorEl={accountIconRef?.current}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorReference="anchorEl"
        onClose={() => setIsAccountMenuOpen(false)}
      >
        <MenuItem onClick={openAccountPage}>Meus dados</MenuItem>
        <Divider />
        <MenuItem onClick={() => authorization.clearAuthData()}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountSection;
