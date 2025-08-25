import Link from 'next/link';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { BlogPost } from '@/types';
import { BLOG_POSTS } from '@/data/blog-posts';
import './animations.css'; // we'll define fade-up in here

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation isHeroVisible={false} activeSection="" />

      <section id="blog" className="section-padding bg-gray-50 relative pt-20">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 py-10">
          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Discover Ilam
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Stories, experiences, and insights from Nepal's beautiful eastern district
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-2 hover:scale-[1.02] fade-up"
              >
                <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-white text-xs px-2 py-1 bg-black bg-opacity-50 rounded">
                      Image: {post.image}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
