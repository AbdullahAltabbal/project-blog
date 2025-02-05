import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers'
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '../../constants';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug)

  if (!blogPostData)
    return null;


  return {
    title: `${blog.frontmatter.title} - ${BLOG_TITLE}`,
    description: blog.frontmatter.abstract
  }
};

async function BlogPost({ params }) {
  const blog = await loadBlogPost(params.postSlug)

  if (!blog) {
    notFound();
  }

  if (!blog) return

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blog.frontmatter.title}
        publishedOn={blog.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={blog.content} components={{ pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }} />
      </div>
    </article>
  );
}

export default BlogPost;
