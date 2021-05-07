import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post,index) => (
          <PostPreview
            key={index}
            title={post.title}
            coverImage={post.feature_image}
            // coverImage={"https://imgix.cosmicjs.com/96ddc2b0-9a23-11ea-bf2a-2b6ff88d4f06-cover.jpg?auto=format&ixlib=react-9.0.2&w=1946"}
            date={post.published_at}
            author={post.authors[0]}
            slug={post.slug}
            excerpt={post.custom_excerpt}
          />
        ))}

      </div>

    </section>
  )
}
