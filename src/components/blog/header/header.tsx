import { component$, useContext, useStore, useStylesScoped$ } from "@builder.io/qwik";
import ArticleSwitch from "./articleSwitch";
import styles from "./header.css?inline";
import { CTX } from "~/routes/blog/layout";

export default component$(() => {
  const title = useContext(CTX);
  useStylesScoped$(styles);

  return (
    <header>
      <div class="iconContainer">
        <img class="icon" src="/icon-transparent.png" />
        <p class="name">Orange</p>
      </div>
      <p class="article-title">
        {title.value}
      </p>
      <ArticleSwitch />
    </header>
  );
});
