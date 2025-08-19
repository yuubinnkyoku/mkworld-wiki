import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-8">
        <h1 className="text-5xl font-bold">MKWorld Wiki</h1>
        <p className="text-xl text-gray-600 mt-2">マリオカートのすべてがここに</p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">コース一覧</h2>
        <ul className="space-y-4">
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className="border rounded-lg p-4 hover:bg-gray-100">
              <Link href={`/courses/${id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {title}
              </Link>
              <br />
              <small className="text-gray-500">
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}