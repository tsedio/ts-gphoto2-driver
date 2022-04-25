import classnames from "classnames";

export interface BxIconProps extends Record<string, unknown> {
  name: string;
  color?: string;
  size?: string;
  className?: string;
  animate?: string | null | undefined;
}

export const BxIcon = ({name, color, className = "", animate, ...props}: BxIconProps) => {
  className = classnames(
    "bx",
    name.includes("bx") ? name : `bx-${name}`,
    color ? `text-${color}` : "",
    animate ? `bx-${animate}` : "",
    className
  );

  return <i {...props} className={className} role="figure" />;
};
