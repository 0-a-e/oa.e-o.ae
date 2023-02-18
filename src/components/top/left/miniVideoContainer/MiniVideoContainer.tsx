import {
  component$,
  useStylesScoped$,
  useContext,
  useStore,
  useClientEffect$,
  useSignal,
  noSerialize,
} from "@builder.io/qwik";
import { activeIndexContext, miniVideoOnChangedContext } from "..";
import MiniVideo from "./MiniVideo";
import styles from "./miniVideoContainer.css?inline";

export default component$(({ data, containerSizes }) => {
  useStylesScoped$(styles);
  type itemRef = {
    container: Element;
    video: Element;
  };
  const itemRefs = useStore({
    container: [],
    video: [],
  });
  const videosContainerRef = useSignal<Element>();
  const miniVideoOnChanged = useContext(miniVideoOnChangedContext);
  const activeIndex = useContext(activeIndexContext);
  const state = useStore({
    viewedData: data,
    defaultData: data,
    dataLength: data.length,
  });
  useClientEffect$(() => {
    state.viewedData = createNewList(0, state);
  });

  type parentOnChangedTypes = {
    index: number;
    from: "big" | "mini";
  };

  miniVideoOnChanged.value = noSerialize((props: parentOnChangedTypes) => {
    onChanged({
      index: { globalIndex: props.index },
      state,
      activeIndex,
      itemRefs,
      from: props.from,
    });
  });
  return (
    <div
      ref={videosContainerRef}
      class="miniVideosContainer"
      style={{ height: containerSizes.height.toString() + "px" }}
    >
      {state.viewedData.map((video, i: number) => (
        <MiniVideo
          video={video}
          i={i}
          itemRefs={itemRefs}
          state={state}
          activeIndex={activeIndex}
          containerSizes={containerSizes}
          onChanged={noSerialize(onChanged)}
        />
      ))}
    </div>
  );
});

export type onChangedProps = {
  index:
    | {
        globalIndex: number;
      }
    | {
        localIndex: number;
      };
  state: any;
  activeIndex: {
    index: number;
    isRefreshBigVideo: boolean;
  };
  itemRefs: any;
  from: "big" | "mini";
};

export const onChanged = (props: onChangedProps) => {
  const { state, activeIndex, itemRefs, from }: onChangedProps = props;
  itemRefs.container[getGlobalIndex(props.index, state)].scrollIntoView({
    behavior: "smooth",
  });
  if (activeIndex.index !== getGlobalIndex(props.index, state)) {
    activeIndex.index = getGlobalIndex(props.index, state);
    if (from == "mini") {
      activeIndex.isRefreshBigVideo = true;
    }
    state.viewedData = createNewList(getGlobalIndex(props.index, state), state);
  }
};

export const getGlobalIndex = (unknownIndex,state) => (
    "localIndex" in unknownIndex
      ? getinDefaultDataIndex(unknownIndex.localIndex, state)
      : "globalIndex" in unknownIndex
      ? unknownIndex.globalIndex
      : 0
);

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
