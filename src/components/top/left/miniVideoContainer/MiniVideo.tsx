import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { activeIndexContext } from "..";
import styles from "./miniVideo.css?inline";
import onChanged from "../onChanged";

export default component$(({
    video,
    i,
    miniVideoItemRefs,
    state,
    containerSizes,
  }) => {
    const activeIndex = useContext(activeIndexContext);
    useStylesScoped$(styles);
    return (
      <div
        class="miniVideoContainer"
        ref={(el) => (miniVideoItemRefs.container[i] = el)}
        onClick$={() => {
          onChanged({
            index: { localIndex: i },
            state: state,
            activeIndex: activeIndex,
            containerRefs: miniVideoItemRefs.container,
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