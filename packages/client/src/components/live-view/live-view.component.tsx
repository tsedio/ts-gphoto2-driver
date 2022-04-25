import {useEffect, useRef} from "react";
import classnames from "classnames";

export interface LiveViewProps {
  id: string;
  isActive: boolean;
}

function useLiveView({id, isActive}: LiveViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && isActive) {
      const url = `/rest/cameras/${id}/live-view/stream`;
      const image = new Image();

      const onload = () => {
        if (canvas && image) {
          canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);

          return (image.src = `${url}?timestamp=${Date.now()}`);
        }
      };

      if (canvas) {
        image.src = `${url}?timestamp=${Date.now()}`;

        image.addEventListener("load", onload);
      }

      return () => {
        image?.removeEventListener("load", onload);
      };
    }
  }, [canvasRef.current, id, isActive]);

  return {canvasRef};
}

export function LiveView(props: LiveViewProps) {
  const {canvasRef} = useLiveView(props);

  return (
    <div className={classnames("live-view", {"opacity-50": !props.isActive})}>
      <canvas ref={canvasRef} className="live-view" />
    </div>
  );
}
