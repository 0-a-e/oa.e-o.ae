import {
  component$,
  createContext,
  noSerialize,
  useClientEffect$,
  useContextProvider,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./index.css?inline";
import SearchIcon from "~/icons/search";
import FilterIcon from "~/icons/filter";
import SeparateIcon from "~/icons/separate";
import Item from "~/components/blog/item";
import { blogType, getBlogs } from "~/library/getBlog";
import { BigVideoContainer } from "./bigVideoContainer/BigVideoContainer";
import MiniVideoContainer from "./miniVideoContainer/MiniVideoContainer";
import { testVideos } from "./testVideos";

export const activeIndexContext = createContext("activeIndex");
export const miniVideoItemRefsContext = createContext("miniVideoItemRefs");

export default component$(() => {
  useStylesScoped$(styles);

  const containerRef = useSignal<Element>();
  const activeIndex = useStore({
    index: 0,
    isRefreshBigVideo: false,
  });
  const state = useStore({
    miniVideoListData: testVideos,
    defaultData: testVideos,
    dataLength: testVideos.length,
  });
  interface miniVideoItemRefsTypes {
    container: Array<Element>;
  }
  const miniVideoItemRefs = useStore<miniVideoItemRefsTypes>({
    container: [],
  });

  const containerSizes = useStore({
    height: 0,
    width: 0,
    minus3_5xHeight: 0,
    minus3_5xWidth: 0,
  });

  /*変数ここまで*/

  useContextProvider(activeIndexContext, activeIndex);
  useContextProvider(miniVideoItemRefsContext, miniVideoItemRefs);

  /*Contextここまで*/

  useClientEffect$(() => {
    if (
      containerRef.value?.clientHeight &&
      containerRef.value?.clientHeight != 0
    ) {
      containerSizes.height = containerRef.value?.clientHeight;
      containerSizes.width = (containerSizes.height / 18) * 9;
      containerSizes.minus3_5xHeight = containerSizes.height / 3.5;
      containerSizes.minus3_5xWidth = containerSizes.width / 3.5;
    }
  });


  return (
    <div class="container" ref={containerRef}>
      {containerSizes.height && containerRef.value?.clientHeight ? (
        <>
          <BigVideoContainer
            data={state.defaultData}
            containerSizes={containerSizes}
          />
          <MiniVideoContainer state={state} containerSizes={containerSizes} />
        </>
      ) : (
        <div />
      )}
    </div>
  );
});
