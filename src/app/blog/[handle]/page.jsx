import React from "react";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../../components/builder";
import BlogHero from "@/components/BlogHero";
import "./styles.css";

export const dynamic = "force-dynamic";

// Initialize Builder once at module level
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Constants
const BUILDER_MODEL_NAME = "blog-article";
const HEADER_HEIGHT = "90px";

// Helper function to fetch Builder content
async function fetchBuilderContent(modelName, options = {}) {
  return builder.get(modelName, options).toPromise();
}

export default async function BlogArticle(props) {
  const builderModelName = BUILDER_MODEL_NAME;
  const params = await props?.params;
  const urlPath = "/" + (params?.handle || "");

  // Fetch all content in parallel for better performance
  const [content, header, footer] = await Promise.all([
    builder
      .get(builderModelName, {
        userAttributes: { urlPath },
        options: { cachebust: true },
        query: { 'data.handle': params?.handle }, // Ensure we fetch by handle
      })
      .toPromise(),
    builder
      .get("symbol", {
        query: { name: "Header" },
      })
      .toPromise(),
    builder
      .get("symbol", {
        query: { name: "Footer" },
      })
      .toPromise(),
  ]);

  // Extract article data with default values
  const articleContent = {
    title: content?.data?.title || "Untitled Article",
    heroImage: content?.data?.image || "",
    description: content?.data?.description || "",
    author: content?.data?.author || "Unknown Author",
    category: content?.data?.category || "General",
    readTime: content?.data?.readTime || "5 min read",
    publishDate: content?.data?.publishDate || new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.log(content);
  }

  return (
    <>
      <FixedHeader header={header} />
      <div style={{ paddingTop: HEADER_HEIGHT }} />
      <BlogHero {...articleContent} />
      <ArticleContent content={content} modelName={builderModelName} />
      <RenderBuilderContent content={footer} model="symbol" />
    </>
  );
}

// Component for the fixed header
function FixedHeader({ header }) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <RenderBuilderContent content={header} model="symbol" />
    </div>
  );
}

// Component for the article content section
function ArticleContent({ content, modelName }) {
  return (
    <section className="article-section">
      <div className="article-content">
        <RenderBuilderContent content={content} model={modelName} />
      </div>
    </section>
  );
}
