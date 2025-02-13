import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { sessionStorage } from '~/services/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );
  return redirect('/login', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) },
  });
}
