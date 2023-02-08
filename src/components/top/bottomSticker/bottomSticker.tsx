import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './bottomSticker.css?inline';

export default component$(() => {
    useStylesScoped$(styles);
  return (
    <div class="container">
      <img class="icon" src="/icon-transparent.png" />
      <div class="name-container">
        <p class="name">Orange</p>
      </div>
    </div>
  );
});
