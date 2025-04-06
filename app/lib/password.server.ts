import argon2 from 'argon2';

/**
 * プレーンテキストのパスワードをハッシュ化して返す関数
 * @param plainTextPassword - ユーザーから受け取ったパスワード
 * @returns ハッシュ化されたパスワード
 */
export const hashPassword = async (
  plainTextPassword: string
): Promise<string> => {
  // デフォルトのパラメータでハッシュ化。必要に応じてオプションを指定できます。
  return await argon2.hash(plainTextPassword);
};

/**
 * ハッシュ化されたパスワードとプレーンテキストのパスワードを検証する関数
 * @param hash - データベースに保存されているハッシュ化パスワード
 * @param plainTextPassword - ログイン時にユーザーが入力したパスワード
 * @returns パスワードが一致すれば true、一致しなければ false
 */
export const verifyPassword = async (
  hash: string,
  plainTextPassword: string
) => {
  return await argon2.verify(hash, plainTextPassword);
};
