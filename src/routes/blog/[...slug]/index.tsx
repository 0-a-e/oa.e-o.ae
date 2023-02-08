import {
  component$,
  useClientEffect$,
  useContext,
  useStore,
} from "@builder.io/qwik";
import {
  RequestHandler,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import NotFound from "~/components/blog/notFound";
import BlogView from "~/components/blog/view/view";
import { getBlogs } from "~/library/getBlog";
import { CTX } from "~/routes/blog/layout";

//あとでexport外してQRLに
export const parseParams = (params: string) => {
  //  const [params] = useLexicalScope();
  const splittedParams = params.split("/");
  const isNumber = (str: string) => /^\d+$/.test(str);

  //10桁以下の数字ならそれ、違う時とない時は0
  const blogId: number | boolean =
    0 in splittedParams &&
    isNumber(splittedParams[0]) &&
    splittedParams[0].length <= 10
      ? Number(splittedParams[0])
      : false;

  //1か0の時はそれ、違う時とない時は0
  const tab: number =
    (1 in splittedParams &&
      isNumber(splittedParams[1]) &&
      Number(splittedParams[1]) == 0) ||
    Number(splittedParams[1]) == 1
      ? Number(splittedParams[1])
      : 0;

  return { blogId: blogId, tab: tab };
};

export default component$(() => {
  const state = useStore<{ blogId: boolean | number; tab: number }>({
    blogId: false,
    tab: 0,
  });
  //なんでかしらんけどこれしないと下でcontextないってエラーでる
  useContext(CTX).value;
  const params = useLocation()["params"]["slug"];
  const nav = useNavigate();
  useClientEffect$(() => {
    const result = parseParams(params);
    state.blogId = result.blogId;
    state.tab = result.tab;
    if (state.blogId) {
      const path =
        "/blog/" + String(state.blogId) + "/" + String(state.tab) + "/";
      nav.path = path;
    }
  });
  if (state.blogId) {
    return (
      <>
        <BlogView blogId={state.blogId} />
      </>
    );
  } else {
    return <NotFound />;
  }
});
