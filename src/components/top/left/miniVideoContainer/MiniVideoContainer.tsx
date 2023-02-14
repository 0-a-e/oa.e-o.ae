import {
  component$,
  useStylesScoped$,
  useContext,
  useStore,
  useClientEffect$,
  useRef,
  useSignal,
} from "@builder.io/qwik";
import { activeIndexContext } from "..";
import styles from "../index.css?inline";
import InfiniteScroll from "infinite-scroll";

export default component$(({ data, containerSizes }) => {
  useStylesScoped$(styles);
  const itemRefs = useSignal<Array<Element>>([]);
  const videosContainerRef = useSignal<Element>();

  const state = useStore({
    viewedData: data,
    defaultData: data,
    dataLength: data.length,
  });
  useClientEffect$(() => {
    state.viewedData = createNewList(0, state);
    /*let infScroll = new InfiniteScroll(videosContainerRef, {
      // options
      path: '.pagination__next',
      append: '.post',
      history: false,
    });*/
  });

  const activeIndex = useContext(activeIndexContext);
  return (
    <div
      ref={videosContainerRef}
      class="miniVideosContainer"
      style={{ height: containerSizes.height.toString() + "px" }}
    >
      {state.viewedData.map((miniVideo, i: number) => (
        <MiniVideo
          miniVideo={miniVideo}
          i={i}
          itemRefs={itemRefs}
          state={state}
          activeIndex={activeIndex}
          containerSizes={containerSizes}
        />
      ))}
    </div>
  );
});

export const MiniVideo = ({
  miniVideo,
  i,
  itemRefs,
  state,
  activeIndex,
  containerSizes,
}) => {
  return (
    <div
      class="miniVideoContainer"
      ref={(el) => (itemRefs.value[i] = el)}
      onClick$={() => {
        const inDefaultDataIndex = getinDefaultDataIndex(i, state);
        itemRefs.value[inDefaultDataIndex].scrollIntoView({
          behavior: "smooth",
        });
        activeIndex.value = inDefaultDataIndex;
        state.viewedData = createNewList(inDefaultDataIndex, state);
      }}
      style={{
        height: containerSizes.minus3_5xHeight.toString() + "px",
        width: containerSizes.minus3_5xWidth.toString() + "px",
      }}
    >
      <p>{miniVideo.title}</p>
      <p>{"{" + i + "}"}</p>
    </div>
  );
};

export const getinDefaultDataIndex = (clickedIndex: number, state) => {
  let i = 0;
  for (const item of state.defaultData) {
    if (
      JSON.stringify(item) == JSON.stringify(state.viewedData[clickedIndex])
    ) {
      return i;
    }
    i++;
  }
  return 0;
};

export const createNewList = (targetIndex: number, state) => {
  return [
    ...state.defaultData.slice(0, targetIndex),
    ...state.defaultData.slice(targetIndex + 1),
  ];
};
