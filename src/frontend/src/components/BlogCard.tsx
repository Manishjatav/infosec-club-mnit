import { Link } from "@tanstack/react-router";
import { Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost } from "../backend.d";
import { formatDate } from "../utils/dateUtils";

interface BlogCardProps {
  post: BlogPost;
  postId: string;
  index?: number;
}

export default function BlogCard({ post, postId, index = 0 }: BlogCardProps) {
  const excerpt = `${post.content.replace(/[#*`>[\]()]/g, "").slice(0, 120)}...`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card-green card-hover group overflow-hidden"
    >
      <Link to="/blog/$postId" params={{ postId }} className="block">
        {post.imageUrl && (
          <div className="overflow-hidden h-44">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="cyber-badge bg-electric-blue/10 text-electric-blue border border-electric-blue/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-neon-green transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/10 pt-3">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neon-green" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-electric-blue" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
