import { useLoaderData } from '@remix-run/react';

export async function loader() {
  return { message: 'This is HomePage loader message.' };
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>HomePage</h1>
      <p>{data.message}</p>
    </div>
  );
}
