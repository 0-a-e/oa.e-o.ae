import {
  component$,
  useStylesScoped$,
  useStore,
  useContext,
  useClientEffect$,
  noSerialize,
} from "@builder.io/qwik";
import Swiper, { Navigation, Pagination, Mousewheel } from "swiper";
import { activeIndexContext } from "..";
import styles from "../index.css?inline";

export const BigVideoContainer = component$(
  ({ data, containerSizes, onChanged }) => {
    useStylesScoped$(styles);

    const state = useStore({
      swiper: null,
    });
    const activeIndex = useContext(activeIndexContext);

    useClientEffect$(() => {
      if (state.swiper === null || state.swiper === undefined) {
        state.swiper = noSerialize(
          new Swiper(".bigVideosContainer", {
            modules: [Navigation, Pagination, Mousewheel],
            direction: "vertical",
            simulateTouch: true,
            allowTouchMove: true,
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            mousewheel: {
              invert: true,
              releaseOnEdges: false,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on: {
              transitionEnd: function (swiper) {
                onChanged({index: swiper.realIndex, from: "big"});
              },
            },
          })
        );
      }
    });

    try {
      if (activeIndex.isRefreshBigVideo) {
        state.swiper.slideTo(activeIndex.index, 1200, true);
        activeIndex.isRefreshBigVideo = false;
      }
    } catch {}

    return (
      <div
        class="bigVideosContainer"
        style={{
          height: containerSizes.height.toString() + "px",
          width: containerSizes.width.toString() + "px",
        }}
      >
        <div class="swiper-wrapper">
          {data.map((bigVideo) => {
            return (
              <div class="bigVideoContainer swiper-slide">
                <div class="titleContainer">
                  <p class="title">
                    {bigVideo.title}
                    {"(" + activeIndex.index + ")"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
