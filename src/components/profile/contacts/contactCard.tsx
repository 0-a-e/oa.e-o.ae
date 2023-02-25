import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { url } from "inspector";
import styles from './contactCard.css?inline';

export default component$((props: { data: Response }) => {
    useStylesScoped$(styles);
//  <img src={data.serviceImage.url} class="background-image" />
    const data = props.data;
    console.log(data);
    return (
      <div class="container">
      <div class="content-container">
      <image src={data.serviceImage.url} class="logo" />
      <h1 class="title">{data.title}</h1>
      <p class="userName">{data.username}</p>
      </div>
      </div>
    );
});
  