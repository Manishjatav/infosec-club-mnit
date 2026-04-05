import { BookOpen, Search, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePublishedBlogPosts } from "../hooks/useQueries";

const samplePosts = [
  {
    title: "Understanding SQL Injection: From Basics to Advanced Exploitation",
    content:
      "# SQL Injection\n\nSQL Injection remains one of the most prevalent and dangerous web vulnerabilities...\n\nIn this comprehensive guide, we'll explore how SQL injection works, common attack vectors, and how to defend against them properly.\n\n## What is SQL Injection?\n\nSQL injection is a code injection technique that might destroy your database...",
    published: true,
    tags: ["Web Security", "SQL", "OWASP"],
    publishedAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Arjun Sharma",
    imageUrl: "/assets/generated/blog-security-cover.dim_800x450.jpg",
  },
  {
    title: "CTF Writeup: How We Cracked the National Cyber Olympics 2025",
    content:
      "## The Challenge\n\nThis year's National Cyber Olympics presented 47 challenges across 6 categories...\n\nHere's our team's approach to solving the hardest challenges in the competition.",
    published: true,
    tags: ["CTF", "Writeup", "Forensics"],
    publishedAt: BigInt(Date.now() - 14 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Priya Mehta",
    imageUrl: "/assets/generated/event-ctf-workshop.dim_800x450.jpg",
  },
  {
    title: "Buffer Overflow Exploitation: A Beginner's Journey",
    content:
      "# Buffer Overflow Exploitation\n\nBuffer overflows are one of the oldest and most classic vulnerability classes in computer security...\n\n## Setting Up Your Lab\n\nBefore we start, you'll need a Linux machine with GDB and pwntools installed.",
    published: true,
    tags: ["Pwn", "Binary Exploitation", "Assembly"],
    publishedAt: BigInt(Date.now() - 21 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Ravi Kumar",
  },
  {
    title: "Malware Analysis: Dissecting a Real-World Ransomware Sample",
    content:
      "## Warning\n\nThis article is for educational purposes only. Always analyze malware in an isolated environment.\n\n## The Sample\n\nWe received this sample from a honeypot we run on our infrastructure...",
    published: true,
    tags: ["Malware", "Reverse Engineering", "Forensics"],
    publishedAt: BigInt(Date.now() - 30 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Sneha Verma",
    imageUrl: "/assets/generated/blog-security-cover.dim_800x450.jpg",
  },
  {
    title: "Introduction to Cryptography: From Caesar to AES",
    content:
      "# The History of Cryptography\n\nCryptography is the practice of secure communication in the presence of adversaries...\n\nIn this article, we trace the evolution from simple substitution ciphers to modern AES encryption.",
    published: true,
    tags: ["Crypto", "Beginner", "Theory"],
    publishedAt: BigInt(Date.now() - 45 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Ananya Gupta",
  },
  {
    title: "OSINT Techniques for Security Researchers",
    content:
      "# Open Source Intelligence\n\nOSINT is the collection and analysis of information gathered from open, publicly available sources...\n\nLearn the tools and methodologies used by professional threat intelligence analysts.",
    published: true,
    tags: ["OSINT", "Recon", "Threat Intelligence"],
    publishedAt: BigInt(Date.now() - 60 * 24 * 3600 * 1000) * BigInt(1_000_000),
    author: "Vikram Singh",
  },
];

export default function BlogPage() {
  const { data: postsFromBackend = [], isLoading } = usePublishedBlogPosts();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const posts = postsFromBackend.length > 0 ? postsFromBackend : samplePosts;
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "All" || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="pt-20">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
        <div className="page-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Blog
            </span>
            <h1 className="section-title text-4xl md:text-5xl mb-4">
              Security <span className="neon-text-green">Insights</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Research articles, CTF writeups, tutorials, and security news from
              the Infosec Club team.
            </p>
          </motion.div>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              id="blog-search"
              className="cyber-input pl-10"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="blog.search_input"
            />
          </div>

          <div
            className="flex flex-wrap gap-2 justify-center mb-10"
            data-ocid="blog.tab"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-electric-blue/20 text-electric-blue border border-electric-blue/50"
                    : "bg-white/5 text-muted-foreground border border-white/10 hover:border-electric-blue/30"
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>

          {isLoading ? (
            <LoadingSpinner text="Loading articles..." />
          ) : filtered.length === 0 ? (
            <div
              className="glass-card-green p-16 text-center"
              data-ocid="blog.empty_state"
            >
              <BookOpen className="w-12 h-12 text-neon-green/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard
                  key={post.title}
                  post={post}
                  postId={`post-${i}`}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
