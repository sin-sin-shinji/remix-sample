import { Form, useActionData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
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
import { FormMessage } from '~/components/molecules/Form';

const schema = z.object({
  email: z
    .string({ message: 'メールアドレスを入力してください' })
    .email({ message: 'メールアドレスの形式で入力してください' }),
  password: z.string({ message: 'パスワードを入力してください' }),
});

export default function LoginPage() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="mx-auto w-[350px] mt-40">
      <Form action="/login" method="post" id={form.id} onSubmit={form.onSubmit}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>ログイン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              {form.errors && (
                <div>
                  {form.errors.map((error) => (
                    <FormMessage key={error}>{error}</FormMessage>
                  ))}
                </div>
              )}
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  type="email"
                  placeholder="メールアドレスを入力してください"
                />
                {fields.email.errors && (
                  <FormMessage>{fields.email.errors}</FormMessage>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  key={fields.password.key}
                  name={fields.password.name}
                  type="password"
                  placeholder="パスワードを入力してください"
                />
                {fields.password.errors && (
                  <FormMessage>{fields.password.errors}</FormMessage>
                )}
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
  const formData = await request.clone().formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const user = await authenticator.authenticate('user-pass', request);

    const session = await sessionStorage.getSession(
      request.headers.get('cookie')
    );
    session.set('user', user);

    throw redirect('/', {
      headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      // ログイン認証処理に失敗した場合は、エラーを追記して返す
      return submission.reply({
        formErrors: ['メールアドレス、またはパスワードが違います'],
      });
    }

    // 上記以外の意図しないエラーの場合は、再送出する
    throw error;
  }
}
