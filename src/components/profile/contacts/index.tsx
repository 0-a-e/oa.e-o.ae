import { component$, Resource } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import ContactCard from "./contactCard";

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
          <ul style={{overflow : 'scroll', position: 'relative', height: "100vh"}}>
            {posts.contents.map((post: Response) => (
              <ContactCard key={post.uri} data={post} />
            ))}
          </ul>
        )}}
      />
    </div>
  );
});
