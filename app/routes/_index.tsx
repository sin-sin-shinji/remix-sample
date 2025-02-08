import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { sessionStorage } from '~/services/session.server';

export default function Rootpage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Hello world!</h1>
      <Link
        to="/logout"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        ログアウト
      </Link>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );
  const user = session.get('user');
  if (!user) throw redirect('/login');

  return null;
}
