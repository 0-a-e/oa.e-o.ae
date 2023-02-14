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
import styles from "../index.css?inline";

export default component$(({ data, containerSizes }) => {
  useStylesScoped$(styles);
  const itemRefs = useSignal<Array<Element>>([]);
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

  miniVideoOnChanged.value = noSerialize((props:parentOnChangedTypes) => {
    onChanged({ index: { globalIndex: props.index }, state, activeIndex, itemRefs, from: props.from });
  });
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
        onChanged({ index: { localIndex: i }, state, activeIndex, itemRefs, from:"mini" });
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
  const index: number =
    "localIndex" in props.index
      ? getinDefaultDataIndex(props.index.localIndex, state)
      : "globalIndex" in props.index
      ? props.index.globalIndex
      : 0;
      itemRefs.value[index].scrollIntoView({
        behavior: "smooth",
      });
  if (activeIndex.index !== index) {
    activeIndex.index = index;
    if (from == "mini"){
      activeIndex.isRefreshBigVideo = true;
    }
    state.viewedData = createNewList(index, state);
  }
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
