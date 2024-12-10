import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { auth } from "../firebase-config";

export default function CreatePage() {
  const navigate = useNavigate();

  async function createPost(newPost) {
    newPost.uid = auth.currentUser.uid; // authenticated user id

    const url = "https://gogreen-app-1d826-default-rtdb.firebaseio.com/posts.json";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New post created: ", data);
      navigate("/");
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <section className="page" id="main-content">
      <div className="container">
        <h1>Create New Post</h1>
        <PostForm savePost={createPost} />
      </div>
    </section>
  );
}
