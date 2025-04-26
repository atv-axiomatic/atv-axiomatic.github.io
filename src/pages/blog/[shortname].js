import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { Layout } from "../../layout/Layout";
import { useRouter } from "next/router";
import {
  Section,
  SectionDivider,
  SectionTitle,
  SectionText,
} from "../../styles/GlobalComponents";
import { BlogTags, BlogTag, StyledMarginBot } from "../../styles/BlogPageStyle";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { blogs } from "../../constants/blog_constants";
import style from "./blog-page-style.module.css";

const BlogPost = () => {
  const [content, setContent] = useState("");
  const [blogInfo, setBlogInfo] = useState();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const shortname = router.query.shortname;
      if (!shortname) return null;
      // Fetch content from markdown file
      fetch(`./${shortname}.md`)
        .then((res) => {
          return res.text();
        })
        .then((text) => setContent(text));

      // Find corresponding blog
      setBlogInfo(blogs.filter((blog) => shortname === blog.shortname)[0]);

      // Track page view for this blog post
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
          page_path: `/blog/${shortname}`,
          page_title: shortname,
        });
      }
    }
  }, [router.isReady, router.query.shortname]);

  return (
    <Layout isBlog={true}>
      {/* Shifts starting of page down */}
      <StyledMarginBot />
      <Section blog>
        <SectionDivider />
        <SectionTitle>{blogInfo?.title}</SectionTitle>
        <SectionText>{blogInfo?.date_posted}</SectionText>
        {/* Reduces padding of SectionText */}
        <div style={{ marginTop: "-20px" }}></div>
        <BlogTags>
          {blogInfo?.topics.map((tag, index) => (
            <BlogTag key={`${blogInfo.shortname}-tag-index-${index}`}>
              {tag}
            </BlogTag>
          ))}
        </BlogTags>
        <br />
        <br />
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          className={style.reactMarkDown}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={children}
                  style={docco}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <SyntaxHighlighter
                  style={docco}
                  className="md-code"
                  PreTag="div"
                >
                  {children}
                </SyntaxHighlighter>
              );
            },
          }}
        />
        <br />
        <SectionDivider />
      </Section>
    </Layout>
  );
};

export default BlogPost;
