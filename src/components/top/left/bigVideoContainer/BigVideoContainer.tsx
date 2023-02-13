import { component$, useStylesScoped$, useStore, useContext, useClientEffect$, noSerialize } from "@builder.io/qwik";
import Swiper, { Navigation, Pagination } from "swiper";
import { activeIndexContext } from "..";
import styles from "../index.css?inline";

export const BigVideoContainer = component$(({ data, containerSizes }) => {
    useStylesScoped$(styles);
    const state = useStore({
      swiper: null,
    });
    const activeIndex = useContext(activeIndexContext);
  
    useClientEffect$(() => {
      if (state.swiper === null || state.swiper === undefined) {
        state.swiper = noSerialize(
          new Swiper(".bigVideosContainer", {
            direction: "vertical",
            loop: true,
            autoplay: {
              delay: 5000,
            },
            modules: [Navigation, Pagination],
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          })
        );
      }
      state.swiper.slideTo(7, 1200, true);
    });
  
    try {
      state.swiper.slideTo(activeIndex.value, 1200, true);
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
                    {"(" + activeIndex.value + ")"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  
  