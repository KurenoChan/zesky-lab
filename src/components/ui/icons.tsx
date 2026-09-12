import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import type { IconBaseProps } from "react-icons";

export function MenuIcon(props: IconBaseProps) { return <FiMenu aria-hidden="true" size={22} {...props} />; }
export function CloseIcon(props: IconBaseProps) { return <FiX aria-hidden="true" size={22} {...props} />; }
export function ArrowIcon(props: IconBaseProps) { return <FiArrowRight aria-hidden="true" size={18} {...props} />; }
