import { Tooltip } from "react-tooltip";

const TOOLTIP_ID = "tooltip";

export const useTooltip = (message: string) => ({
  "data-tooltip-id": TOOLTIP_ID,
  "data-tooltip-content": message,
});

interface TooltipProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return (
    <>
      {children}
      <Tooltip id={TOOLTIP_ID} />
    </>
  );
};

export default TooltipProvider;
