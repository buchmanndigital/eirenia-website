import Image from "next/image";
import { PortraitBadge, PortraitPlaceholder } from "./icons/portrait-decorations";

type FounderPortraitFrameProps = {
  priority?: boolean;
};

export function FounderPortraitFrame({ priority }: FounderPortraitFrameProps) {
  return (
    <div className="fpframe">
      <Image
        src="/andreas-zettel.jpeg"
        alt="Andreas Zettel"
        fill
        className="fpimg"
        sizes="(max-width: 900px) 100vw, 480px"
        priority={priority}
      />
      <PortraitPlaceholder />
      <PortraitBadge />
    </div>
  );
}
