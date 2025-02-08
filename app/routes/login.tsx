import { Form } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { sessionStorage } from '~/services/session.server';

export default function LoginPage() {
  return (
    <div className="mx-auto w-[350px] mt-40">
      <Form action="/login" method="post">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="メールアドレスを入力してください"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="パスワードを入力してください"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>ログイン</Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.authenticate('user-pass', request);

  const session = await sessionStorage.getSession(
    request.headers.get('cookie')
  );
  session.set('user', user);

  throw redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
  });
}
