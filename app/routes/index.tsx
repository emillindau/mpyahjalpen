import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { getJarData, JarData } from "~/sr";
import headerImg from "~/images/mpya.png";

// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  return getJarData();
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData<JarData>();
  console.log("data", data);

  return (
    <div className="remix__page">
      <main>
        <img src={headerImg} alt="header image" />
        <h2>Mpyahjälpen 2021!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p>PS. We need your cash</p>
      </main>
      <aside>
        {/* <h2>Demos In This App</h2>
        <ul>
          {data.demos.map(demo => (
            <li key={demo.to} className="remix__page__resource">
              <Link to={demo.to} prefetch="intent">
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Resources</h2>
        <ul>
          {data.resources.map(resource => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul> */}
      </aside>
    </div>
  );
}
