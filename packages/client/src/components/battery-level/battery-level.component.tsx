import classnames from "classnames";

export function BatteryLevel({value, unit = "%"}: any) {
  return (
    <div className="battery-level">
      <div className={classnames("battery-progress-bar", {"bx-flashing": value < 10})}>
        <div className="relative" style={{width: `${value}%`}} />
      </div>
      <div className="flex items-center">
        {value}
        {unit}
      </div>
    </div>
  );
}
