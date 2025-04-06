import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { prisma } from '~/infrastructures/db.server';
import { verifyPassword } from '~/lib/password.server';
import { User } from '~/models/user';

export const authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const password = form.get('password');

    if (!email || !password) {
      throw Error('Both `email` and `password` must be present.');
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toString() },
    });

    if (!user) {
      throw new Error('Error');
    }

    // パスワード検証。ハッシュと比較して検証する。
    const isValid = await verifyPassword(user.password, password.toString());
    if (!isValid) {
      throw new Error('Error');
    }

    return { id: user.id, email: user.email };
  }),
  'user-pass'
);
