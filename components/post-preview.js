import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import Image from "next/image";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5 border-2">
        {/*<CoverImage slug={slug} title={title} url={coverImage} />*/}
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a aria-label={title}>
                  {coverImage &&
        <Image src={coverImage } width={500} height={300} />
                  }
              </a>
          </Link>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.profile_image} />
    </div>
  )
}