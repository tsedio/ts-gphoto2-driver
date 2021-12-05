import {SummaryItemModel, Widget, WidgetRangeModel} from "../../utils/ApiClient";
import {useState} from "react";

function WidgetText({label, value, unit}: Widget) {
  return (
    <>
      <h5 className="my-0 font-bold">{label}</h5>
      <span>
        {value}
        {unit}
      </span>
    </>
  );
}

function WidgetSection({label, value}: Widget) {
  return (
    <>
      <h3 className={"text-lg text-blue-500 block pb-1"}>
        {label}
        {value}
      </h3>
      <hr className={"border-b-1 border-gray-600"} />
    </>
  );
}

function WidgetEnum({label, changed, path, id, value, unit, choices, readonly, onChange}: Widget & {onChange: (value: any) => void}) {
  return (
    <>
      <label htmlFor={id} className="my-0 font-bold">
        {label}
        {changed ? "*" : ""}
      </label>
      <select
        className={"border-2 border-gray-700 bg-white w-full p-1 rounded-lg"}
        name={label}
        disabled={readonly}
        defaultValue={value}
        onChange={(evt) => {
          onChange(evt.target.value);
        }}
      >
        {choices?.map((itemValue) => {
          return (
            <option key={(id || "") + (path || "") + itemValue + label} value={itemValue} selected={value === itemValue}>
              {itemValue}
              {unit}
            </option>
          );
        })}
      </select>
    </>
  );
}

function WidgetRange({label, changed, id, value, min, max, step, onChange, readonly}: WidgetRangeModel & {onChange: (value: any) => void}) {
  const [v, setValue] = useState(value);

  return (
    <>
      <label htmlFor={id} className="my-0 font-bold">
        {label} {changed ? "*" : ""}
      </label>
      <div className={"flex justify-center items-center"}>
        <input
          className={"w-full"}
          type="range"
          min={min}
          max={max}
          step={step}
          name={id}
          value={v}
          disabled={readonly}
          onChange={(evt) => {
            const {value} = evt.target;
            setValue(value);
            onChange(value);
          }}
        />{" "}
        <span className={"ml-2"}>{v}</span>
      </div>
    </>
  );
}

const components: Record<string, any> = {
  enum: WidgetEnum,
  section: WidgetSection,
  range: WidgetRange,
  default: WidgetText
};

export function Widgets({onChange, items = []}: {items: Widget[]; onChange?: (item: SummaryItemModel) => void}) {
  return (
    <ul className={"reset-list p-2 pb-5"}>
      {items
        .filter(
          (widget) =>
            !widget.label.match(
              /Shooting Bank Name|Battery Level|Property 0x|White Balance Preset Name|White Balance Preset Value|Menu Bank Name/
            )
        )
        .map((widget, index) => {
          const Component = widget.readonly ? components.default : components[widget.type] || components.default;

          return (
            <li className={"mb-2"} key={`${widget.label}${index}`}>
              <Component
                {...widget}
                onChange={(value: any) =>
                  onChange &&
                  onChange({
                    ...widget,
                    value
                  })
                }
              />
            </li>
          );
        })}
    </ul>
  );
}
