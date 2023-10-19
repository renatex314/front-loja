import { authorization } from "@/core";
import { useTooltip } from "@/providers/TooltipProvider";
import { Divider, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import UserIcon from "../../UserIcon";

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
      <UserIcon
        className="hover:scale-110 duration-100 cursor-pointer"
        {...useTooltip("Minha conta")}
      />

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
