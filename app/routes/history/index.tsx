import { Link, useLoaderData } from "remix";
import { getHistoryItems, HistoryItem } from "~/history";

export const loader = () => {
  return getHistoryItems();
};

export default function History() {
  const historyItems = useLoaderData<HistoryItem[]>();

  return (
    <div>
      <h1>History</h1>
      <ul>
        {historyItems.map((item) => (
          <li key={item.slug}>
            <Link to={item.slug}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
