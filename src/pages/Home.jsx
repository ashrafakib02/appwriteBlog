import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!authStatus || !userData?.$id) return;

    appwriteService.getActivePosts(true, userData.$id).then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, [authStatus, userData?.$id]);
// const visiblePosts = authStatus ? posts : [];

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover: text-gray-500">
                {authStatus ? "No Posts Available" : "Login to Read Post"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
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

export default Home;
