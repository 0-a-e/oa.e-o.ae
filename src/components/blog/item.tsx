import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import type { blogType } from "~/library/getBlog";
import styles from './item.css?inline';

export default component$(() => {
    useStylesScoped$(styles);
    const resource = useEndpoint<Array<blogType>>();
    return (
        <div class="container">
            <Resource
        value={resource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
        onResolved={(blogs) => {
            console.log(blogs);
            return (
          <ul>
          </ul>);
     } }
      />
            <img src="https://s-phone.jp/wp-content/uploads/2022/01/IMG_7233.jpg" class="background-image" />
            <div class="shadow" />
            <div class="text-container">
                <p class="title">SP03(デジタルフォトフレーム)にAndroid4.0を焼く話</p>
                <p class="date">2023/1/23</p>
            </div>
        </div>
    );
});