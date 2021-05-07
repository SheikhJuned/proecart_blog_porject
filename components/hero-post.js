import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import Image from "next/image";

export default function HeroPost({
    id,
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {

  return (
    <section>
      <div className="mb-8 md:mb-16 ">
        {/*<CoverImage title={title} url={coverImage ?coverImage :process.env.DEFAULT_IMAGE_URL } slug={slug} />*/}
        {/*<Image src={"https://imgix.cosmicjs.com/96ddc2b0-9a23-11ea-bf2a-2b6ff88d4f06-cover.jpg?auto=format&ixlib=react-9.0.2&w=1946" } layout="fill" objectFit="contain"/>*/}
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
        {/*<Link as={`/posts/${id}`} href="/posts/[id]">*/}
        <a aria-label={title}>
          {coverImage &&
          <Image src={coverImage}
                 layout="responsive"
              // layout="intrin  sic"
                 className="object-cover "
                 width={"200px"}
                 height={"100%"}
          />
          }
          </a>
        </Link>


      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt ?excerpt :""}</p>
          <Avatar
            // name={"author.title"}
            name={author.name}
            // picture={"https://imgix.cosmicjs.com/8efcc570-9a21-11ea-bf2a-2b6ff88d4f06-e73aee30-1db0-11ea-a594-a170ead8b2cb-12.jpg?auto=format,compress,enhance&w=100&h=100"}
            picture={author.profile_image}
          />
        </div>
      </div>
    </section>
  )
}
