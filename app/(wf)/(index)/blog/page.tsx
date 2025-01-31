import { Footer } from '@/components/WFIndex/Footer';
import { Header } from '@/components/WFIndex/Header';
import { IndexHeader } from '../IndexHeader';
import db from 'kotilogi-app/dbconfig';
import Link from 'next/link';
import Image from 'next/image';

async function BlogPostCard({ post }: { post: TODO }) {
  return (
    <div
      className='rounded-lg bg-wf-secondary overflow-hidden'
      title='Lue lisää...'>
      <div className='w-full h-[200px] relative overflow-hidden object-center'>
        <Image
          src={post.image_url}
          loading='lazy'
          alt='post image'
          objectFit='cover'
          fill={true}
        />
      </div>
      <div className='p-4 gap-4 flex flex-col text-white'>
        <span>
          <h1 className='text-white font-semibold'>{post.title}</h1>
          <span>{post.date.toLocaleDateString('fi')}</span>
        </span>

        <p className='bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent'>
          {post.short_content}
        </p>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await db('blog_posts')
    .select('id', 'title', 'image_url', 'date', 'short_content')
    .orderBy('date', 'desc');

  return (
    <main className='bg-wf-background h-full flex flex-col w-full'>
      <IndexHeader />
      <section
        id='blog-hero'
        className='flex flex-col gap-12 px-wf-index py-wf-index'>
        <div className='flex flex-col gap-12 items-start'>
          <h1 className='text-7xl bg-gradient-to-r from-white via-white to-wf-primary-light text-transparent bg-clip-text'>
            Kotidok uutiset ja artikkelit
          </h1>
        </div>
      </section>

      {/**Render the blog-entry cards here in a grid. */}
      <section
        id='blog-entries-section'
        className='grid 2xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4 px-wf-index'>
        {posts.length ? (
          posts.map((post, i) => (
            <Link
              href={`blog/${post.id}`}
              key={`post-card-${i}`}>
              <BlogPostCard post={post} />
            </Link>
          ))
        ) : (
          <span>Artikkeleiden lataus epäonnistui!</span>
        )}
      </section>
      <Footer />
    </main>
  );
}
