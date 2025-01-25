import { Link } from '@remix-run/react';

export default function Rootpage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
}
