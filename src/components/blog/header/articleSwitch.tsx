import { component$, useStylesScoped$, useStore } from "@builder.io/qwik";
import styles from "./header.css?inline";

export default component$(() => {
    useStylesScoped$(styles);
    const store = useStore({ switch: 0 });
  
    return (
      <div class="buttonContainer">
        <button
          class={["button", { selected: store.switch == 0 }]}
          onClick$={() => (store.switch = 0)}
        >
          A
        </button>
        <button
          class={["button", { selected: store.switch == 1 }]}
          onClick$={() => (store.switch = 1)}
        >
          B
        </button>
      </div>
    );
  });
  