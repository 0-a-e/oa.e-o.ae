import {
  component$,
  useStylesScoped$,
  useContext,
  useClientEffect$,
  useSignal,
} from "@builder.io/qwik";
import { miniVideoItemRefsContext } from "..";
import MiniVideo from "./MiniVideo";
import styles from "./miniVideoContainer.css?inline";
import { createNewList } from "../onChanged";

export default component$(({ containerSizes, state }) => {
  useStylesScoped$(styles);

  const videosContainerRef = useSignal<Element>();
  const miniVideoItemRefs = useContext(miniVideoItemRefsContext);
  useClientEffect$(() => {
    state.miniVideoListData = createNewList(0, state);
  });

  //あとでminiVideoItemRefsは一回リスト作ってから入れるようにする 最適化

  return (
    <div
      ref={videosContainerRef}
      class="miniVideosContainer"
      style={{ height: containerSizes.height.toString() + "px" }}
    >
      {state.miniVideoListData.map((video, i: number) => (
        <MiniVideo
          video={video}
          i={i}
          miniVideoItemRefs={miniVideoItemRefs}
          state={state}
          containerSizes={containerSizes}
        />
      ))}
    </div>
  );
});
