import { component$, useContext } from "@builder.io/qwik";
import { CTX } from "./layout";

export default component$(() => {
  useContext(CTX).value = "ブログ一覧";
  return (
    <div class="container">
      <p>いえーい</p>
    </div>
  );
});
