import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./miniVideo.css?inline";

export default component$(({
    video,
    i,
    itemRefs,
    state,
    activeIndex,
    containerSizes,
    onChanged
  }) => {
    useStylesScoped$(styles);
    return (
      <div
        class="miniVideoContainer"
        ref={(el) => (itemRefs.container[i] = el)}
        onClick$={() => {
          onChanged({
            index: { localIndex: i },
            state,
            activeIndex,
            itemRefs,
            from: "mini",
          });
        }}
        style={{
          height: containerSizes.minus3_5xHeight.toString() + "px",
          width: containerSizes.minus3_5xWidth.toString() + "px",
        }}
      >
        <img src={video.thumbnail} class="backgroundImage" />
        <div class="titleContainer">
          <p class="title" style={{ color: video.titleColor }}>
            {video.title}
          </p>
        </div>
      </div>
    );
  });