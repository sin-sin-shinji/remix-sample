import { Links, Meta, Outlet, Scripts } from '@remix-run/react';

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
