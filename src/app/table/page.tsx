import ClientTable from "./ClientTable";

export default async function Home() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return <ClientTable initialData={data} />;
}
