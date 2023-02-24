import {
  component$,
  useClientEffect$,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { RightArrowIcon } from "~/icons/arrow";
import styles from "./index.css?inline";
import anime from "animejs/lib/anime.es.js";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  const menus = [
    {
      title: "ブログ一覧",
    },
    {
      title: "作ったやつ",
    },
    {
      title: "プロフィIル",
    },
  ];
  useClientEffect$(() => {
    const grid = [10, 30];
    const staggersAnimation = anime
      .timeline({
        targets: ".stagger-visualizer div",
        easing: "easeInOutSine",
        delay: anime.stagger(50),
        loop: true,
        autoplay: false,
      })
      .add({
        translateX: [
          {
            value: anime.stagger("-.1rem", {
              grid: grid,
              from: "center",
              axis: "x",
            }),
          },
          {
            value: anime.stagger(".1rem", {
              grid: grid,
              from: "center",
              axis: "x",
            }),
          },
        ],
        translateY: [
          {
            value: anime.stagger("-.1rem", {
              grid: grid,
              from: "center",
              axis: "y",
            }),
          },
          {
            value: anime.stagger(".1rem", {
              grid: grid,
              from: "center",
              axis: "y",
            }),
          },
        ],
        duration: 1000,
        scale: 0.5,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
      })
      .add({
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-10, 10),
        delay: anime.stagger(8, { from: "last" }),
      })
      .add({
        translateX: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "x",
        }),
        translateY: anime.stagger(".25rem", {
          grid: grid,
          from: "center",
          axis: "y",
        }),
        rotate: 0,
        scaleX: 2.5,
        scaleY: 0.25,
        delay: anime.stagger(4, { from: "center" }),
      })
      .add({
        rotate: anime.stagger([90, 0], { grid: grid, from: "center" }),
        delay: anime.stagger(50, { grid: grid, from: "center" }),
      })
      .add({
        translateX: 0,
        translateY: 0,
        scale: 0.5,
        scaleX: 1,
        rotate: 180,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: "center" }),
      })
      .add({
        scaleY: 1,
        scale: 1,
        delay: anime.stagger(20, { grid: grid, from: "center" }),
      });
    staggersAnimation.play();
  });
  return (
    <div class="container">
      <div class="menusContainer">
        {menus.map((menu) => (
          <MenuItem menu={menu} />
        ))}
        <div class="bottom-container">
          <p class="copyright">©2018-2023 Orange 版权所有</p>
        </div>
      </div>
    </div>
  );
});

export const MenuItem = component$(({ menu }) => {
  useStylesScoped$(styles);
  return (
    <div class="menuContainer">
      <p class="text">{menu.title}</p>
      <div class="menuBox">
     {/*   <div class="stagger-visualizer">
          {(() => {
              const elems = [];
               const grid = [10, 30];
               const col = grid[0];
               const row = grid[1];
               const numberOfElements = col * row;
               for (let i = 0; i < numberOfElements; i++) {
                 elems.push(<div />);
               }
               return elems;
          })()}
        </div>*/}
        <p>奥行き持たせて箱みたいにしたい</p>
      </div>
    </div>
  );
});
