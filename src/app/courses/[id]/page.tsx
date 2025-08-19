import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

// 静的に生成するパスのリストを返す
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(path => ({
    id: path.params.id,
  }));
}

// ページコンポーネント
export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  if (!postData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">ホーム</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">コース一覧</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{postData.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main>
        <article className="prose lg:prose-xl max-w-none">
          <h1>{postData.title}</h1>
          <p className="text-muted-foreground">{postData.date}</p>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </main>

      <footer className="mt-12">
        <Button asChild variant="outline">
          <Link href="/">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            一覧に戻る
          </Link>
        </Button>
      </footer>
    </div>
  );
}