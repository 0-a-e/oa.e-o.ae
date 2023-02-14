import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { RightArrowIcon } from "~/icons/arrow";
import styles from "./index.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const menus = [
    {
      title: "ブログ一覧",
    },
    {
      title: "プロフィIル",
    },
    {
      title: "このサイトについて",
    },
  ];
  return (
    <div class="container">
        <div class="profileContainer">
        <img class="icon" src="/icon-transparent.png" />
      <div class="name-container">
        <p class="name">Orange</p>
      </div>
        </div>
        <div class="menusContainer">
        {menus.map((menu) => {
          return (
            <div class="menuContainer">
              <p class="text">{menu.title}</p>
              <div class="menuBox">
          
              </div>
            </div>
          );
        })}
        </div>
      <div class="bottom-container">
        <p class="copyright">©2018-2023 Orange 版权所有</p>
      </div>
      </div>
  );
});
