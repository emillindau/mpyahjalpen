import { Outlet, Link, useLoaderData } from "remix";
import { getHistoryItems, HistoryItem } from "~/history";
import adminStyles from "~/styles/admin.css";

export const loader = () => {
  return getHistoryItems();
};

export const links = () => [{ rel: "stylesheet", href: adminStyles }];

export default function Admin() {
  const historyItems = useLoaderData<HistoryItem[]>();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {historyItems.map((item) => (
            <li key={item.slug}>
              <Link to={item.slug}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
