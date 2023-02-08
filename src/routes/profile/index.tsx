import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Contacts from "~/components/profile/contacts";
import Introduce from "~/components/profile/introduce";
import styles from "./index.css?inline";
import { RequestHandler } from "@builder.io/qwik-city";
import { getProfileLink, Response } from "~/library/getLinkList";

export const onGet: RequestHandler<Array<Response>> = async () => {
  const data = await getProfileLink();
  return data;
};

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="body">
      <div class="left">
        <Introduce />
      </div>
      <div class="right">
        <Contacts />
      </div>
    </div>
  );
});
