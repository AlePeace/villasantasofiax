import { AnimationCardCamere } from "components/AnimationCardCamere";
import { AnimationCardHome } from "components/AnimationCardHome";
import { ArticleGroup } from "components/ArticleGroup/ArticleGroup";
import { BookCamera } from "components/BookCamera";
import { BookExpHome } from "components/BookExpHome/BookExpHome";
import { EsterniVilla } from "components/EsterniVilla";
import { CameraHome } from "components/CameraHome/CameraHome";
import { CilentoHome } from "components/CilentoHome";
import { DescriptionCamere } from "components/DescriptionCamere/DescriptionCamere";
import { Footer } from "components/Footer";
import { HeroCamere } from "components/HeroCamere/HeroCamere";
import { HeroDintorni } from "components/HeroDintorni/HeroDintorni";
import { HeroHome } from "components/HeroHome/HeroHome";
import { InfoCamera } from "components/InfoCamera";
import { ServicesCamera } from "components/ServicesCamera/ServicesCamera";
import { SuggestHome } from "components/SuggestHome";
import { SummaryCamere } from "components/SummaryCamere/SummaryCamere";
import { PostsGrid } from "components/PostsGrid";
import { VillaHome } from "components/VillaHome";

export const BlockRenderer = ({ blocks, heroVideoSrc }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/group": {
        const groupName =
          block.attributes?.metadata?.name || block.attributes?.className;
        switch (groupName) {
          case "HeroHome": {
            const videoBlock = block.innerBlocks?.find((b) => b.name === "core/video");
            return (
              <HeroHome
                key={block.id}
                blocks={block}
                videoSrc={heroVideoSrc}
                videoPoster={videoBlock?.attributes?.poster}
              />
            );
          }

          case "VillaHome":
            return <VillaHome key={block.id} blocks={block} />;

          case "CameraHome":
            return <CameraHome key={block.id} blocks={block} />;

          case "AnimationCardHome":
            return <AnimationCardHome key={block.id} blocks={block} />;

          case "CilentoHome":
            return <CilentoHome key={block.id} blocks={block} />;

          case "BookExpHome":
            return <BookExpHome key={block.id} blocks={block} />;

          case "SuggestHome":
            return <SuggestHome key={block.id} blocks={block} />;

          case "HeroCamere":
            return <HeroCamere key={block.id} blocks={block} />;

          case "DescriptionCamere":
            return <DescriptionCamere key={block.id} blocks={block} />;

          case "AnimationCardCamere":
            return <AnimationCardCamere key={block.id} blocks={block} />;

          case "BookCamera":
            return <BookCamera key={block.id} blocks={block} />;

          case "SummaryCamere":
            return <SummaryCamere key={block.id} blocks={block} />;

          case "InfoCamera":
            return <InfoCamera key={block.id} blocks={block} />;

          case "ServicesCamera":
            return <ServicesCamera key={block.id} blocks={block} />;

          case "EsterniVilla":
            return <EsterniVilla key={block.id} blocks={block} />;

          case "HeroDintorni":
            return <HeroDintorni key={block.id} blocks={block} />;

          case "PostsGrid":
            return <PostsGrid key={block.id} />;

          case "ArticleGroup":
            return <ArticleGroup key={block.id} blocks={block} />;

          case "Footer":
            return <Footer key={block.id} blocks={block} />;

          default:
            return null;
        }
      }
    }
  });
};
