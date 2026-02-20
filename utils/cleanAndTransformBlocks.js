import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const assignIDs = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks?.lenght) {
        assignIDs(block.innerBlocks);
      }
    });
  };

  assignIDs(blocks);

  return blocks;
};
