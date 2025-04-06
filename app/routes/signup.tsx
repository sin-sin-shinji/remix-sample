import { Form, useActionData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
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
import { FormMessage } from '~/components/molecules/Form';
import { hashPassword } from '~/lib/password.server';
import { prisma } from '~/infrastructures/db.server';

const schema = z
  .object({
    email: z
      .string()
      .email({ message: '正しいメールアドレスを入力してください' }),
    password: z
      .string()
      .min(8, { message: 'パスワードは8文字以上必要です' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
        message: '大文字・小文字・数字を含む必要があります',
      }),
    confirmPassword: z.string({ message: 'パスワードを入力してください' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export default function SignupPage() {
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
      <Form
        action="/signup"
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>ログインユーザー登録</CardTitle>
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
                  aria-invalid={!!fields.email.errors}
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
                  aria-invalid={!!fields.password.errors}
                />
                {fields.password.errors && (
                  <FormMessage>{fields.password.errors}</FormMessage>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">もう一度パスワードを入力</Label>
                <Input
                  id="confirmPassword"
                  key={fields.confirmPassword.key}
                  name={fields.confirmPassword.name}
                  type="password"
                  placeholder="もう一度パスワードを入力してください"
                  aria-invalid={!!fields.confirmPassword.errors}
                />
                {fields.confirmPassword.errors && (
                  <FormMessage>{fields.confirmPassword.errors}</FormMessage>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">登録</Button>
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

  const { email, password } = submission.value;

  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return redirect('/login');
}
