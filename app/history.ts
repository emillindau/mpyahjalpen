import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type HistoryItem = {
  slug: string;
  title: string;
};

export type HistoryItemCreateData = {
  slug: string;
  title: string;
  markdown: string;
};

export type HistoryMarkdownAttributes = {
  title: string;
};

function isValidHistoryAttributes(
  attributes: any
): attributes is HistoryMarkdownAttributes {
  return attributes?.title;
}

// Relative to the server output, not source
const historyItemPaths = path.join(__dirname, "..", "history");

export async function getHistoryItems() {
  const dir = await fs.readdir(historyItemPaths);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(historyItemPaths, filename));

      const { attributes, body } = parseFrontMatter(file.toString());

      invariant(
        isValidHistoryAttributes(attributes),
        `${filename} has bad meta data!`
      );

      const html = marked(body);
      return {
        slug: filename.replace(/\.md/, ""),
        title: attributes.title,
        html,
      };
    })
  );
}

export async function getHistoryItem(slug: string) {
  const items = await getHistoryItems();
  return items.find((i) => i.slug === slug);
}

export async function createHistoryItem(item: HistoryItemCreateData) {
  const md = `---\ntitle: ${item.title}\n---\n\n${item.markdown}`;

  await fs.writeFile(path.join(historyItemPaths, item.slug + ".md"), md);

  return getHistoryItem(item.slug);
}
