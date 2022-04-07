import { PostData } from '@self/lib/postData';
import { FormattedDate } from '@libs/common';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '@self/components/CodeBlock';
import Link from 'next/link';
import Image from 'next/image';

import styles from './PostLayout.module.scss';

type PostLayoutProps = {
  post: PostData;
};

export default function PostLayout({ post }: PostLayoutProps) {
  return (
    <article className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <h2 className={styles.postTitle}>{post.meta.title}</h2>
        <Link href={`/posts/${post.id}`}>
          <a title="Permalink">
            <LinkIcon />
          </a>
        </Link>
      </div>
      <div className={styles.postDate}>
        <FormattedDate rawDate={post.meta.date}></FormattedDate>
      </div>
      <PostCoverImage coverImage={post.meta.coverImage} coverImageCaption={post.meta.coverImageCaption} />
      <div className={styles.postContent}>
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

type PostCoverImageProps = {
  coverImage?: string;
  coverImageCaption?: string;
};

function PostCoverImage({ coverImage, coverImageCaption }: PostCoverImageProps) {
  if (!coverImage) {
    return null;
  }
  return (
    <div className={styles.postCoverImage}>
      <div className={styles.postCoverImageWrapper}>
        <Image
          src={coverImage}
          alt={coverImageCaption || ''}
          priority
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      {coverImageCaption && <ReactMarkdown>{coverImageCaption}</ReactMarkdown>}
    </div>
  );
}

function LinkIcon() {
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
    </svg>
  );
}