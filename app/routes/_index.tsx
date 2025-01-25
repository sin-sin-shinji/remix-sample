import { Link } from '@remix-run/react';

export default function Rootpage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Hello world!</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
}
