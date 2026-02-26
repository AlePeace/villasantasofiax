import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
import Head from "next/head";
import parse from "html-react-parser";

export const Page = (props) => {
  console.log("PAGE PORPS:", props);
  return (
    <div>
      <Head>
        <title>{props.seo?.title}</title>
        {parse(props.seo?.fullHead)}
        </Head>
      <MainMenu menuData={props.menus} />
      <BlockRenderer blocks={props.blocks} />
    </div>
  );
};
