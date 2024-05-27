import { createPost } from "@/util/actions/translation-app-actions/posts";
import PostForm from "@/components/translation-app-components/forms/basic-exampl/post-form";

export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
