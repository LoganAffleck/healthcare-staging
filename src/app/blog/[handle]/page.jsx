import React from "react";
import { builder } from "@builder.io/sdk";
import Link from "next/link";
import { RenderBuilderContent } from "../../../components/builder";
import "./styles.css";

export const dynamic = "force-dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

const ARTICLES_PER_PAGE = 15;

export default async function BlogArticle(props) {
  // Builder Public API Key set in .env file
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);
  const builderModelName = "blog-article";
  let params = await props?.params;

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  const header = await builder
    // Get the page content from Builder with the specified options
    .get("symbol", {
      query: {
        name: "Header",
      },
    })
    // Convert the result to a promise
    .toPromise();

  const hero = await builder
    // Get the page content from Builder with the specified options
    .get("article-hero")
    // Convert the result to a promise
    .toPromise();

  const footer = await builder
    // Get the page content from Builder with the specified options
    .get("symbol", {
      query: {
        name: "Footer",
      },
    })
    // Convert the result to a promise
    .toPromise();

  let articleContent = {
    title: content?.data?.title,
    heroImage: content?.data?.image,
    description: content?.data?.description,
    author: content?.data?.author,
    category: content?.data?.category,
    readTime: content?.data?.readTime,
    publishDate: content?.data?.publishDate,
  };

  console.log("Article content:", articleContent);

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <RenderBuilderContent content={header} model={"symbol"} />
      </div>
      <div style={{ paddingTop: "90px" }}></div>
      <RenderBuilderContent
        content={hero}
        model={"article-hero"}
        data={articleContent}
      />
      <section className="article-section">
        <div
          className="article-content"
        >
          <RenderBuilderContent content={content} model={builderModelName} />
        </div>
      </section>

      <RenderBuilderContent content={footer} model={"symbol"} />
    </>
  );
}
