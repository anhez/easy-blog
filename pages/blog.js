import Link from 'next/link'
function Blog({ posts }) {
  return (
    <div className={"bg-gradient-to-tl from-green-400 via-pink-500 to-blue-500 "}>
    <ul className={"grid grid-cols-3 gap-4 p-8 max-w-6xl mx-auto"}>
      {posts.data.map((post,index) => (
        <li className={"bg-white shadow-xl p-4"} key={'li-'+index}>
          <div className={"flex items-center mb-2"}>
            <div className={"mr-3"}>
              <img className={"w-8 h-8 rounded-full mx-auto"} src={post.owner.picture} />
            </div>
            <div className={""}>
              <div className={"font-medium"}>{post.owner.firstName +' '+post.owner.lastName}</div>
              <div className={"font-light text-sm"}>{post.owner.email}</div>
            </div>
          </div>
          <hr className={"mb-2"}></hr>
          <img className={"mb-1"} src={post.image} />
          <div className={"mb-2"} >
            {post.tags.map((tag,i) => (
              <span key={"tag-"+i} className={"bg-pink-700 px-2 mr-1 rounded-full text-white text-sm"}>{tag}</span>
            ))}
          </div>
          <div className={""}>{post.text}</div>
          <div className={"truncate mb-2"}>
            <a className="mb2 text-blue-700 hover:underline" href={post.link}>{post.link}</a>
          </div>
          <hr className={"mb-2"}></hr>
          <div className={"mb-2 flex justify-between"}>
              <div className="">
                <svg className="w-5 h-5 inline-block mr-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#3c4cad"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
                <span>{post.likes+ ' likes'}</span>
              </div>
              <div className="inline-block">
                {(new Date(post.publishDate)).toLocaleString()}
              </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://dummyapi.io/data/api/post?limit=10', { headers: { 'app-id': process.env.DUMMYAPI } })
  const posts = await res.json()
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default Blog
