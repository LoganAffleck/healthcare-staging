"use client";
import React from "react";
import styles from "./BlogHero.module.css";
import dateFromTimestamp from "@/app/scripts/dateFromTimestamp";

function BlogHero({
  category,
  publishDate,
  readTime,
  title,
  description,
  author,
  heroImage,
  backUrl = "/blog",
}) {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.backContainer}>
          <a href={backUrl} className={styles.backLink}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3124f13d16c344a781aa2e5bdbc00183%2Ffd6f21e156cc4db0b9582c9c739f74cb"
              className={styles.backIcon}
              alt="Back arrow"
            />
            <div className={styles.backText}>
              <p>Back</p>
            </div>
          </a>
        </div>
        <div className={styles.mainGrid}>
          <div className={styles.contentColumn}>
            <div className={styles.categoryText}>
              <p>{category}</p>
            </div>
            <div className={styles.metadataText}>
              <p>
                {dateFromTimestamp(publishDate)} · {readTime} min read time
              </p>
            </div>
            <div className={styles.titleText}>
              <p>{title}</p>
            </div>
            <div className={styles.descriptionText}>
              <p>{description}</p>
            </div>
            <div className={styles.authorContainer}>
              <img
                src={
                  author?.value?.data?.portrait ||
                  author?.portrait ||
                  "https://cdn.builder.io/api/v1/image/assets%2F3124f13d16c344a781aa2e5bdbc00183%2Feb3745a4db0044d5a9abc7f0c3a5589b"
                }
                className={styles.authorImage}
                alt={`Portrait of ${
                  author?.value?.data?.name || author?.name || "Author"
                }`}
              />
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>
                  <p>
                    {author?.value?.data?.name ||
                      author?.name ||
                      "Author's Name"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={heroImage}
            className={styles.heroImage}
            alt={title || "Article hero image"}
          />
        </div>
      </section>
    </div>
  );
}

export default BlogHero;
