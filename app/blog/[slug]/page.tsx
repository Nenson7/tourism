import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog-posts";
import { BlogPost } from "@/types";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths (replaces getStaticPaths)
export async function generateStaticParams() {
  return BLOG_POSTS.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation isHeroVisible={false} activeSection="" />

      <section className="section-padding bg-white pt-20">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 py-10 max-w-4xl fade-up">
          {/* Back button */}
          <Link href="/blog">
            <button className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm flex items-center">
              ← Back to Blog
            </button>
          </Link>

          {/* Title + meta */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-md text-gray-600 mb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed text-2xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
