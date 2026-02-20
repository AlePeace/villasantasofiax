import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
import Head from "next/head";
import parse from "html-react-parser";

export const Page = (props) => {
  console.log("PAGE PORPS:", props);
  return (
    <div>
      <Head>{parse(props.seo?.fullHead)}</Head>
      <MainMenu items={props.mainMenuItems} />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};
