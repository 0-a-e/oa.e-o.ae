import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { handleVideoEnded } from "./BigVideoContainer";
import styles from "./bigVideo.css?inline";
import swiperStyles from "./swiper.css?inline";

export const BigVideo = component$(({ video, state, videosRef, index }) => {
    useStylesScoped$(styles, swiperStyles);
    return (
      <div class="bigVideoContainer swiper-slide">
        <div class="container">
          <video
            ref={(el) => {
              videosRef.value[index] = el;
            }}
            onEnded$={() => handleVideoEnded(state.swiper)}
            class="backgroundVideo"
            muted
            autoPlay
            playsInline
            controls={false}
            src={video.video}
          />
          <div class="titleContainer">
            <p class="title" style={{ color: video.titleColor }}>
              {video.title}
            </p>
          </div>
        </div>
      </div>
    );
  });
  