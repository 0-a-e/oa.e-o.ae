import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import { Item } from "./item";

export default component$(() => {
  const resource = useEndpoint<Array<Response>>();
  return (
    <div>
      <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
        onResolved={(posts) => {
          console.log(posts);
          return(
          <ul>
            {posts.contents.map((post: Response) => (
              <Item key={post.uri} data={post} />
            ))}
          </ul>
        )}}
      />
    </div>
  );
});
