import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { motion } from "motion/react";
import SimpleMarkdown from "../components/SimpleMarkdown";
import { usePublishedBlogPosts } from "../hooks/useQueries";
import { formatDate } from "../utils/dateUtils";

const samplePosts = [
  {
    title: "Understanding SQL Injection: From Basics to Advanced Exploitation",
    content: `# SQL Injection

SQL Injection remains one of the most prevalent and dangerous web vulnerabilities today. According to OWASP, it consistently ranks in the Top 10 web application security risks.

## What is SQL Injection?

SQL injection is a code injection technique that might destroy your database. It is one of the most common web hacking techniques. It occurs when a user provides malicious SQL input that is then executed by the database.

## A Simple Example

\`\`\`sql
SELECT * FROM users WHERE username = 'admin' AND password = 'password'
-- With injection:
SELECT * FROM users WHERE username = '' OR '1'='1'-- ' AND password = ''
\`\`\`

## Prevention

1. Use parameterized queries
2. Implement input validation
3. Use stored procedures
4. Apply the principle of least privilege
5. Use Web Application Firewalls (WAF)

## Conclusion

Always sanitize user input and use parameterized queries to prevent SQL injection attacks.`,
    published: true,
    tags: ["Web Security", "SQL", "OWASP"],
    publishedAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Arjun Sharma",
    imageUrl: "/assets/generated/blog-security-cover.dim_800x450.jpg",
  },
];

export default function BlogPostPage() {
  const params = useParams({ from: "/blog/$postId" });
  const { data: postsFromBackend = [] } = usePublishedBlogPosts();

  const posts = postsFromBackend.length > 0 ? postsFromBackend : samplePosts;
  const postIndex = Number.parseInt(params.postId.split("-").pop() || "0");
  const post = posts[postIndex] || posts[0];

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <p className="text-muted-foreground">Article not found.</p>
        <Link
          to="/blog"
          className="text-neon-green hover:underline mt-4 inline-block"
        >
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="page-container py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-neon-green transition-colors text-sm mb-8"
          data-ocid="blog.link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {post.imageUrl && (
            <div className="overflow-hidden rounded-xl mb-8 h-72">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="cyber-badge bg-electric-blue/10 text-electric-blue border border-electric-blue/30"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-black mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-neon-green" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-electric-blue" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          <SimpleMarkdown>{post.content}</SimpleMarkdown>
        </motion.article>
      </div>
    </div>
  );
}
