import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { url } from "inspector";
import styles from './item.css?inline';

export const Item = component$((props: { data: Response }) => {
    useStylesScoped$(styles);
//  <img src={data.serviceImage.url} class="background-image" />
    const data = props.data;
    console.log(data);
    return (
      <div class="container">
      <div class="content-container">
      <h1>{data.title}</h1>
      <p>{data.username}</p>
      </div>
      </div>
    );
});
  