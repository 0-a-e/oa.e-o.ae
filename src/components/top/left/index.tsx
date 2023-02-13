import {
  component$,
  createContext,
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
import { RequestHandler, useContent } from "@builder.io/qwik-city";
import { blogType, getBlogs } from "~/library/getBlog";
import anime from "lib/anime.es.js";

import { BigVideoContainer } from "./bigVideoContainer/BigVideoContainer";
import MiniVideoContainer from "./miniVideoContainer/MiniVideoContainer";

export const activeIndexContext = createContext("activeIndex");

export default component$(() => {
  useStylesScoped$(styles);

  const containerRef = useSignal<Element>();
  const activeIndex = useSignal<number>(0);
  const containerSizes = useStore({
    height: 0,
    width: 0,
    minus3_5xHeight: 0,
    minus3_5xWidth: 0,
  });
  useContextProvider(activeIndexContext, activeIndex);
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

  const testVideos = [
    {
      title: "A1",
    },
    {
      title: "B2",
    },
    {
      title: "C3",
    },
    {
      title: "D4",
    },
    {
      title: "E5",
    },
    {
      title: "F6",
    },
    {
      title: "G7",
    },
    {
      title: "H8",
    },
  ];

  return (
    <div class="container" ref={containerRef}>
      {containerSizes.height && containerRef.value?.clientHeight ? (
        <>
          <BigVideoContainer
            data={testVideos}
            containerSizes={containerSizes}
          />
          <MiniVideoContainer
            data={testVideos}
            containerSizes={containerSizes}
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
});
