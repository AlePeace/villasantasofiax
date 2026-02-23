import { CameraHome } from "components/CameraHome/CameraHome";
import { HeroHome } from "components/HeroHome/HeroHome";
import { VillaHome } from "components/VillaHome";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/group": {
        const groupName =
          block.attributes?.metadata?.name || block.attributes?.className;
        console.log("GROUP BLOCK: ", block);
        console.log("GROUP NAME: ", groupName);
        switch (groupName) {
          case "HeroHome":
            return <HeroHome key={block.id} blocks={block} />;

          case "VillaHome":
            return <VillaHome key={block.id} blocks={block} />;

          case "CameraHome":
            return <CameraHome key={block.id} blocks={block} />;

          default:
            return null;
        }
      }
    }
  });
};
