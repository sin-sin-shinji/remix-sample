import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';
import tailwindStyle from './styles/tailwind.css';

export const links: LinksFunction = () => [
  // Memo: 型が`module "*.css"`となり型エラーとなるため、 解決のため`string`へキャスト
  { rel: 'stylesheet', href: tailwindStyle as string },
];

export default function App() {
  return (
    <html lang="jp">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
