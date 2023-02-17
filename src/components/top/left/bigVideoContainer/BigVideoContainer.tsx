import {
  component$,
  useStylesScoped$,
  useStore,
  useContext,
  useClientEffect$,
  noSerialize,
  useSignal,
} from "@builder.io/qwik";
import Swiper, { Navigation, Pagination, Mousewheel } from "swiper";
import { activeIndexContext } from "..";
import { BigVideo } from "./BigVideo";
import styles from "./bigVideoContainer.css?inline";
import swiperStyles from './swiper.css?inline';
export const BigVideoContainer = component$(
  ({ data, containerSizes, onChanged }) => {
    const state = useStore({
      swiper: null,
    });
    const activeIndex = useContext(activeIndexContext);
    const videosRef = useSignal<Array<Element>>([]);

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
              // invert: true,
              releaseOnEdges: false,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on: {
              transitionEnd: function (swiper) {
                onChanged({ index: swiper.realIndex, from: "big" });
                videosRef.value[swiper.realIndex].play();
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
    useStylesScoped$(styles, swiperStyles);
    return (
      <div
        class="bigVideosContainer"
        style={{
          height: containerSizes.height.toString() + "px",
          width: containerSizes.width.toString() + "px",
        }}
      >
        <div class="swiper-wrapper">
          {data.map((video, index: number) => (
            <BigVideo
              video={video}
              state={state}
              videosRef={videosRef}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
);

export const handleVideoEnded = (state) => {
  state.swiper.slideNext();
};
