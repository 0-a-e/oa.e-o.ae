import {
  component$,
  Resource,
  useClientEffect$,
  useContext,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import {
  RequestHandler,
  useContent,
  useEndpoint,
  useLocation,
} from "@builder.io/qwik-city";
import { blogType, getBlog, getBlogs } from "~/library/getBlog";
import NotFound from "../notFound";
import { marked } from "marked";
import { CTX } from "~/routes/blog/layout";
import  styles from './view.css?inline'
export const getBlogFunc = async (blogId: string) => {
  const data = await getBlog(blogId);
  return data.contents.length != 0 ? data.contents[0] : false;
};

//<blogType>
export default component$(({ blogId }) => {
  //<{ blogId: boolean | number; tab: number }>
  const blog = useStore({
    blogData: false,
    tab: 0,
  });


  useClientEffect$(() => {
    (async () => {
      blog.blogData = await getBlogFunc(blogId);
    })();
  });

  //<Array<blogType>>
  return blog.blogData ? <BlogView blogData={blog.blogData} /> : <NotFound />;
});

export const BlogView = component$(({ blogData }) => {
  useStylesScoped$(styles);
  useContext(CTX).value = blogData.title
  return <div class="text" dangerouslySetInnerHTML={marked(blogData.content)} />;
});
