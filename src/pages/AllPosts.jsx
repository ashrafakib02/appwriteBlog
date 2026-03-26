import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService.getActivePosts(true,userData?.$id).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [userData?.$id]);
  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-6">All Posts</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard
                id={post.$id}
                title={post.title}
                featuredImage={post.featured_image}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
