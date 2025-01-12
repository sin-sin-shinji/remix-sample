import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { getSomeValue } from '~/services/sample';

export async function loader() {
  return { message: 'This is HomePage loader message.', value: getSomeValue() };
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1>HomePage</h1>
      <p>{data.message}</p>
      <p>{data.value}</p>
    </div>
  );
}
