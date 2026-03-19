import { Heading } from "components/Heading";
import { List } from "components/List";
import { Paragraph } from "components/Paragraph";

export const Footer = ({ blocks }) => {
  const footerBlock = blocks?.innerBlocks || [];
  const blocksByType = {
    paragraphs: footerBlock.filter((b) => b.name === "core/paragraph"),
    headings: footerBlock.filter((b) => b.name === "core/heading"),
    lists: footerBlock.find((b) => b.name === "core/list"),
  };

  const { headings, paragraphs } = blocksByType;

  const headingLabels = [
    "titleNaviga",
    "titleContatti",
    "safePayment",
    "usefullLink",
  ];

  const paragraphLabels = [
    "description",
    "address",
    "phone",
    "email",
    "paymentMethods",
    "ascea",
    "taxes",
    "beach",
    "credits",
    "privacy",
  ];

  const paragraphMap = Object.fromEntries(
    paragraphLabels.map((label, idx) => [label, paragraphs[idx]]),
  );

  const headingMap = Object.fromEntries(
    headingLabels.map((label, idx) => [label, headings[idx]]),
  );

  return (
    <>
      <footer className="bg-peach py-10 lg: px-5 lg:pt-20 lg:pb-10 lg:px-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 lg:pb-20">
            <div className="space-y-5 lg:space-y-10">
              <div>
                {" "}
                <svg
                  id="a"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 1417.3 850.4"
                  width="156.5px"
                  height="101.86px"
                  className="w-full h-full"
                >
                  <g>
                    <path
                      className="fill-blue"
                      d="M133.8,646.9c0-16.7,9.1-26.9,28-26.8,24.5,0,45.8,10.7,58.1,31.2h1.7l5-36.7h-60.7c-35,0-50.9,24.7-50.9,47.1,0,69.6,98,59.4,98,109.7s-9.1,31.6-31.7,31.6c-24.5,0-45.8-10.7-58.1-31.2h-1.6l-5,36.7h60.7c37.9,0,57.3-22.2,57.3-55.2h0c0-69.3-100.7-66.7-100.7-106.5Z"
                    />
                    <path
                      className="fill-blue"
                      d="M358,790.6h0v-69c0-34.1-32.8-46.1-52.3-46.1s-44.8,5.9-44.8,27.7c0,31.4,63.5,7.6,62.2,65.7-.4,18.7-11.6,34.5-28.2,34.5-28.3,0-32.8-70.8,7-68v-2.5c-75-6.5-69.4,77.7-13.5,77.7s39.7-21.7,40.1-43.2c1.1-58.7-54.6-46.9-54.6-71.1s24.4-15.9,30.8-15.9c21.9,0,24.2,16.5,24.2,37.6v91h34.3v-2c-3.5-2.5-5.2-6.6-5.2-16.3Z"
                    />
                    <path
                      className="fill-blue"
                      d="M497,790.6h0s.3-74.8.3-74.8c.9-22.9-14.7-40.3-35-40.3s-33.4,5-46.9,38.9l.5-14.8c0-27.9-33.5-31.9-42.1-8.5l1.1,3.8c6.2-8.6,11.9-4.6,11.9.5v95.2c0,9.7-1.7,13.9-5.2,16.4v2h39.5v-2c-3.5-2.5-5.2-6.6-5.2-16.4v-65.5c11.3-28.8,22.6-40.2,34.9-40.2s17.5,11.6,17.2,43v62.6c0,9.7-1.7,13.9-5.2,16.4v2h39.5v-2c-3.5-2.5-5.2-6.6-5.2-16.4Z"
                    />
                    <path
                      className="fill-blue"
                      d="M572.5,802.1c-10.4,0-21.8-8.5-21.8-36.2v-88.2h27.8v-2.2h-55.4c14.1-.8,40.3-13.3,40.3-38h-23.5c0,18.7-12.2,38-32.2,38v2.2h13.9v84c0,37.3,23.5,48.8,44.4,48.8s34.6-13.9,39-39.9h0l-1.2-.6c-4.2,21.3-18.4,32-31.4,32Z"
                    />
                    <path
                      className="fill-blue"
                      d="M724.6,790.6h0v-69c0-34.1-32.8-46.1-52.3-46.1s-44.8,5.9-44.8,27.7c0,31.4,63.5,7.6,62.2,65.7-.4,18.7-11.6,34.5-28.2,34.5-28.3,0-32.8-70.8,7-68v-2.5c-75-6.5-69.4,77.7-13.5,77.7s39.7-21.7,40.1-43.2c1.1-58.7-54.6-46.9-54.6-71.1s24.4-15.9,30.8-15.9c21.9,0,24.2,16.5,24.2,37.6v91h34.3v-2c-3.5-2.5-5.2-6.6-5.2-16.3Z"
                    />
                    <path
                      className="fill-blue"
                      d="M809.1,646.9c0-16.7,9.1-26.9,28-26.8,24.5,0,45.8,10.7,58.1,31.2h1.7l5-36.7h-60.7c-35,0-50.9,24.7-50.9,47.1,0,69.6,98,59.4,98,109.7s-9.1,31.6-31.7,31.6c-24.5,0-45.8-10.7-58.1-31.2h-1.7l-5,36.7h60.7c37.9,0,57.3-22.2,57.3-55.2h0c0-69.3-100.7-66.7-100.7-106.5Z"
                    />
                    <path
                      className="fill-blue"
                      d="M986.4,675.5c-31.5,0-63.7,27.7-63.7,73.5s27.3,61.5,58.8,61.5,63.8-29.1,63.8-73.5h0c0-38.3-27.3-61.5-58.8-61.5ZM998.9,802.5c-22.2,8.3-37.8-11.3-46-44.6-8.3-33.5-10-63.6,16.3-74.4,21.9-9,37.5,11.5,45.7,44.7h0c8.3,33.5,8.7,65-16,74.3Z"
                    />
                    <path
                      className="fill-blue"
                      d="M1166.6,790.6v-91.3c0-17.6-13.3-25.7-25.4-23.4v-.4h-34.8c-30.4,0-34.9-62.3-8.8-62.3,10.6-.3,21.6,5.6,27.3,22.2h1.4l4-26.4c-15,0-19.3,0-32.7,0-23.3,0-41.9,15-41.9,33.5s13.8,33,39.8,33h-42.8v2.2c9.2,0,13.9,7.2,13.9,22.2v90.7c0,9.7-1.6,13.9-5.2,16.4v2h39.5v-2c-3.5-2.5-5.2-6.6-5.2-16.4v-112.8h0s40.1,0,40.1,0c-4.9,2.4-9.1,6.7-11.5,13.1l1.1,3.8c6.2-8.6,11.9-4.6,11.9.5v95.5c0,9.7-1.7,13.9-5.2,16.4v2h39.5v-2h0c-3.5-2.5-5.2-6.6-5.2-16.4Z"
                    />
                    <path
                      className="fill-blue"
                      d="M1151.1,661.5c17.5,0,17.5-28,0-28s-17.5,28,0,28Z"
                    />
                    <path
                      className="fill-blue"
                      d="M1297.2,790.6h0v-69c0-34.1-32.8-46.1-52.3-46.1s-44.8,5.9-44.8,27.7c0,31.4,63.5,7.6,62.2,65.7-.4,18.7-11.6,34.5-28.2,34.5-28.3,0-32.8-70.8,7-68v-2.5c-75-6.5-69.4,77.7-13.5,77.7s39.7-21.7,40.1-43.2c1.1-58.7-54.6-46.9-54.6-71.1s24.4-15.9,30.8-15.9c21.9,0,24.2,16.5,24.2,37.6v91h34.3v-2c-3.5-2.5-5.2-6.6-5.2-16.3Z"
                    />
                    <path
                      className="fill-blue"
                      d="M520.6,487.4c6.6,16.8,22.6,59.3,28,74.2h6.6c9.1-23.1,25.2-61.9,29.3-72,5.2-13,7.8-14.2,17.1-15.3h0v-4.7h-32.8v4.7c11.6,1.3,12.8,3.1,9.5,12.2-4.4,12-12.5,32.3-20.5,51.5-6.2-16.1-16.5-44.4-20.5-55.6-2.1-5.6-1.9-6.8,8.3-8.1v-4.7c0,0-39.9,0-39.9,0v4.7c8.9.8,10.9,2.8,15,13.2Z"
                    />
                    <path
                      className="fill-blue"
                      d="M648.2,555.3c-10.9-1.2-12.1-1.8-12.1-13.6v-53.9c0-11.8,1.3-12.6,12.1-13.7v-4.7h-41v4.7c10.8,1,12.1,1.9,12.1,13.7v53.9c0,11.8-1.2,12.5-12.1,13.6v4.7h41v-4.7Z"
                    />
                    <path
                      className="fill-blue"
                      d="M728.3,534.5c-2.4,5.5-5.7,11.4-8.7,14.4-3.3,3.7-5.4,5-13,5s-8.3,0-8.6-.1c-7.8-.1-8.3-3.1-8.3-11v-55c0-11.8,1.4-12.6,12.4-13.6v-4.7h-41.3v4.7c10.7.9,12.1,1.9,12.1,13.6v53.9c0,11.8-1.1,12.6-13.5,13.6v4.7h67.6c1.3-4,5.3-18.6,6.3-24h0s-5-1.5-5-1.5Z"
                    />
                    <path
                      className="fill-blue"
                      d="M813.1,536h0s-5-1.5-5-1.5c-2.4,5.5-5.7,11.4-8.7,14.4-3.3,3.7-5.4,5-13,5s-8.3,0-8.6-.1c-7.8-.1-8.3-3.1-8.3-11v-55c0-11.8,1.4-12.6,12.4-13.6v-4.7h-41.3v4.7c10.7.9,12.1,1.9,12.1,13.6v53.9c0,11.8-1.1,12.6-13.5,13.6v4.7h67.6c1.3-4,5.3-18.6,6.3-24Z"
                    />
                    <path
                      className="fill-blue"
                      d="M897.1,540.5c-9-23.6-18.5-48.9-27.3-73l-5.9,1.1-28.9,72.4c-4.8,12-7,13.2-15.8,14.3v4.7h33.6v-4.7c-11.2-1.1-14-2.2-11-11.1,1.6-4.8,3.6-10.2,5.4-15.2h28.2c2.4,6.7,4.8,13.2,6.3,17.8,2,5.8,1.6,7.2-7.3,8.4v4.7h38.3v-4.7c-9.4-1.1-10.6-2.1-15.5-14.8ZM849.3,522.4c3.7-10.5,7.9-21,12.1-31.7h0l11.4,31.7h-23.5Z"
                    />
                  </g>
                  <path
                    className="fill-orangelogo"
                    d="M781,328.4c-35.5,4.7-50,60.2-50,32.5,0-79.2,154.2-34.7,154.2-144.3,1.9-41.1-36.9-80.4-93.4-74.2-25,0-47.1,16.1-54.9,39.8h0l-28,141-28-141h0c-9-29.4-39.1-43-68.2-39.8-55.1,0-80,38.8-80,74.2,0,109.6,154.3,65.1,154.3,144.3s-14.6-27.3-50-32.5c-93.8-13.9-101.8,91.1-101.8,91.1,44.1-5,151.2,16.7,173.8-26.6,22.4,43.2,130,21.6,173.8,26.6,0,0-6.4-103.8-101.8-91.1h0Z"
                  />
                  <path
                    className="fill-orangelogo"
                    d="M709.1,156.4c0-37.8-20.5-58.3-58.3-58.3,37.8,0,58.3-20.5,58.3-58.3,0,37.8,20.5,58.3,58.3,58.3-37.8,0-58.3,20.5-58.3,58.3Z"
                  />
                </svg>
              </div>
              {paragraphMap.description && (
                <div>
                  <Paragraph
                    content={paragraphMap.description.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
            </div>
            <div className="pt-10 space-y-5">
              {headingMap.titleNaviga && (
                <div>
                  <Heading
                    level={headings.attributes?.level}
                    content={headingMap.titleNaviga.attributes.content}
                    className="font-nunito text-blue/50 text-sm uppercase"
                  />
                </div>
              )}
              {blocksByType.lists && (
                <List
                  blocks={blocksByType.lists?.innerBlocks}
                  className="space-y-5"
                  contentClassName="font-nunito text-blue/70 font-medium"
                />
              )}
            </div>
            <div className="pt-10 space-y-5">
              {headingMap.titleContatti && (
                <div>
                  <Heading
                    level={headings.attributes?.level}
                    content={headingMap.titleContatti.attributes.content}
                    className="font-nunito text-blue/50 text-sm uppercase"
                  />
                </div>
              )}
              {paragraphMap.address && (
                <div>
                  <Paragraph
                    content={paragraphMap.address.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
              {paragraphMap.phone && (
                <div>
                  <Paragraph
                    content={paragraphMap.phone.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
              {paragraphMap.email && (
                <div>
                  <Paragraph
                    content={paragraphMap.email.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
            </div>
            <div className="pt-10 space-y-5">
              {headingMap.safePayment && (
                <div>
                  <Heading
                    level={headings.attributes?.level}
                    content={headingMap.safePayment.attributes.content}
                    className="font-nunito text-blue/50 text-sm uppercase"
                  />
                </div>
              )}
              {paragraphMap.paymentMethods && (
                <div>
                  <Paragraph
                    content={paragraphMap.paymentMethods.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
              {headingMap.usefullLink && (
                <div className="pt-5">
                  <Heading
                    level={headings.attributes?.level}
                    content={headingMap.usefullLink.attributes.content}
                    className="font-nunito text-blue/50 text-sm uppercase"
                  />
                </div>
              )}
              {paragraphMap.ascea && (
                <div>
                  <Paragraph
                    content={paragraphMap.ascea.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
              {paragraphMap.taxes && (
                <div>
                  <Paragraph
                    content={paragraphMap.taxes.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
              {paragraphMap.beach && (
                <div>
                  <Paragraph
                    content={paragraphMap.beach.attributes.content}
                    className="font-nunito text-blue text-sm"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="bg-blue/10 h-px w-full"></div>
          <div className="pt-5 lg:pt-10 lg:flex lg:items-center lg:justify-between">
            {paragraphMap.credits && (
              <div>
                <Paragraph
                  content={paragraphMap.credits.attributes.content}
                  className="font-nunito text-blue/50 text-sm"
                />
              </div>
            )}
            {paragraphMap.privacy && (
              <div>
                <Paragraph
                  content={paragraphMap.privacy.attributes.content}
                  className="font-nunito text-blue/50 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};
