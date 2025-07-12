import React from "react";
import { builder } from "@builder.io/sdk";
import Link from "next/link";
import { RenderBuilderContent } from "../../components/builder";

export const dynamic = "force-dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

const ARTICLES_PER_PAGE = 15;

export default async function Blog(props) {
  let params = await props?.params;
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing out all blog articles
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  const builderModelName = "blog-homepage";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      options: { enrich: true },
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/blog",
      },
    })
    // Convert the result to a promise
    .toPromise();



  return (
    <>
      <RenderBuilderContent
        content={content}
        model={builderModelName}
        data={{ articles: articles }}
      />
    </>
  );
}
