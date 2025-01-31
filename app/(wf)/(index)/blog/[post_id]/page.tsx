import db from 'kotilogi-app/dbconfig';
import { IndexHeader } from '../../IndexHeader';
import style from './style.module.css';
import Image from 'next/image';

export default async function PostPage({ params }) {
  const { post_id } = await params;
  const post = await db('blog_posts').where({ id: post_id }).first();

  return (
    <main className='bg-wf-background h-full flex flex-col w-full'>
      <IndexHeader />
      {post ? (
        <section
          id='blog-post-section'
          className='2xl:px-96 xl:px-72 lg:px-32 md:px-24 xs:px-2 py-wf-index text-white'>
          <div className='flex flex-col mb-4'>
            <h1 className='font-semibold text-4xl'>{post.title}</h1>
            <span className='text-lg'>{post.date.toLocaleDateString('fi')}</span>
          </div>
          <img
            loading='lazy'
            src={post.image_url}
            className={style['img']}
          />

          <div
            className={style['content-container']}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
      ) : (
        <span>Artikkelia ei ole olemassa.</span>
      )}
    </main>
  );
}
