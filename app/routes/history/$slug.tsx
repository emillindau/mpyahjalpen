import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { getHistoryItem } from "~/history";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected slug");
  return getHistoryItem(params.slug);
};

export default function HistorySlug() {
  const historyItem = useLoaderData();

  return <div dangerouslySetInnerHTML={{ __html: historyItem.html }} />;
}
