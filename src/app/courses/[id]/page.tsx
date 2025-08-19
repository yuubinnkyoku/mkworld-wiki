import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

// 静的に生成するパスのリストを返す
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // getAllPostIdsは { params: { id: '...' } }[] を返すので、
  // Next.js 13+ の generateStaticParams が期待する { id: '...' }[] の形式に変換する
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
      <article className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
        <div className="text-gray-500 mb-8">
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          ← トップに戻る
        </a>
      </div>
    </div>
  );
}
