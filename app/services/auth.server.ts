import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { User } from '~/models/user';

export const authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const password = form.get('password');

    if (!email || !password) {
      throw Error('Both `email` and `password` must be present.');
    }

    // TODO: ここで対象のUser情報をDBから取得する処理を追加する
    const user: User = {
      id: 1,
      email: email.toString(),
      displayName: 'Test User1',
    };
    return user;
  }),
  'user-pass'
);
