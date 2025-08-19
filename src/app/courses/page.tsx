import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "コース一覧 | MKWorld Wiki",
};

export default function CoursesPage() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">コース一覧</h1>
        <p className="text-muted-foreground">全コースの一覧です。各コースの詳細ページへ移動できます。</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPostsData.map(({ id, date, title, tags }) => (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>ここにコースの簡単な説明文が入ります。</p>
              {Array.isArray(tags) && tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
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
    </div>
  );
}

