import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import styles from "./index.css?inline";
import Right from "../components/top/right";
import Left from "~/components/top/left";
import { blogType, getBlogs } from "~/library/getBlog";
import BottomSticker from "~/components/top/bottomSticker/bottomSticker";

//      <img class="background" src={"https://papers.co/wallpaper/papers.co-va92-wallpaper-triangle-fall-orange-pattern-36-3840x2400-4k-wallpaper.jpg"} />
export const onGet: RequestHandler<Array<blogType>> = async () => {
  const data = await getBlogs();
  return data;
};


export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container">
      <div class="left-container">
        <Left />
      </div>
      <div class="right-container">
        <Right />
      </div>
      <BottomSticker />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
};
