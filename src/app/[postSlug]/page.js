import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers'
import { MDXRemote } from 'next-mdx-remote/rsc';

async function BlogPost({ params }) {
  const blog = await loadBlogPost(params.postSlug)

  if (!blog) return

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blog.frontmatter.title}
        publishedOn={blog.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blog.content} />
      </div>
    </article>
  );
}

export default BlogPost;
