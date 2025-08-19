import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-12">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">MKWorld Wiki</h1>
        <p className="text-lg text-muted-foreground mt-4">
          マリオカートのすべてがここに
        </p>
      </header>

      <main>
        <h2 className="text-3xl font-bold mb-6">コース一覧</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPostsData.map(({ id, date, title }) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>ここにコースの簡単な説明文が入ります。</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <Link href={`/courses/${id}`}>
                    詳しく見る
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
