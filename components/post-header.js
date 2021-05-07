import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Image from "next/image";

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar
          name={author.name}
          picture={author.profile_image}
        />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        {/*<CoverImage title={title} url={coverImage?coverImage:process.env.DEFAULT_IMAGE_URL} />*/}
          {coverImage &&
        <Image src={coverImage}
               layout="responsive"
            // layout="intrin  sic"
               className="object-cover "
               width={"200px"}
               height={"100%"}
        />
          }
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.profile_image} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}
