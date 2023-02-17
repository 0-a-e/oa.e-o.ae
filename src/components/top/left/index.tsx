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
import { RequestHandler, useContent } from "@builder.io/qwik-city";
import { blogType, getBlogs } from "~/library/getBlog";
import anime from "lib/anime.es.js";

import { BigVideoContainer } from "./bigVideoContainer/BigVideoContainer";
import MiniVideoContainer from "./miniVideoContainer/MiniVideoContainer";

export const activeIndexContext = createContext("activeIndex");
export const miniVideoOnChangedContext = createContext("onChanged");
export default component$(() => {
  useStylesScoped$(styles);

  const containerRef = useSignal<Element>();
  const activeIndex = useStore({
    index: 0,
    isRefreshBigVideo: false,
  });
  const miniVideoOnChanged = useSignal();
  useContextProvider(activeIndexContext, activeIndex);
  useContextProvider(miniVideoOnChangedContext, miniVideoOnChanged);
  
  const containerSizes = useStore({
    height: 0,
    width: 0,
    minus3_5xHeight: 0,
    minus3_5xWidth: 0,
  });
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

  type parentOnChangedTypes = {
    index: number;
    from: "big" | "mini";
  };
  const onChanged = (props:parentOnChangedTypes) => {
    miniVideoOnChanged.value(props);
  };

  return (
    <div class="container" ref={containerRef}>
      {containerSizes.height && containerRef.value?.clientHeight ? (
        <>
          <BigVideoContainer
            data={testVideos}
            onChanged={noSerialize(onChanged)}
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

export const testVideos = [
  {
    title: "P50Proの短期レビュー",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-2381-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "フォトフレーム(SP03)に\nAndroid4を焼く話",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-2381-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "ファーウェイ端末への\nGMS導入2023",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-lines-of-light-underwater-in-a-pool-1280-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "VisionFive2の開封",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-yellow-and-orange-ink-1198-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "契約切れのGPS端末を\n有効活用する",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-2381-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "xxxxのxxxxx",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-green-ink-1196-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "決済用端末\n(square Terminal)\nの分解",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-2381-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "square Terminal\nをハックする",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-purple-and-white-ink-1203-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "エイレネクラゲ\nのクラゲ芽発生条件",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-waves-lines-of-light-underwater-in-a-pool-1280-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "女装、始めました",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-green-fabric-texture-while-waving-40229-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "偵察気球、\n作ってみる話",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-multicolor-filtered-lights-with-smoke-1845-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "こわれせんべい\nを再成形して\nアイデンティティを奪う",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-blue-and-pink-swirling-ink-1193-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "キタミズクラゲ\nのプラヌラを入手する",
    titleColor: "#000",
    video: "https://assets.mixkit.co/videos/preview/mixkit-blue-ink-swirling-1195-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "ロボットで自販機の下を漁る話",
    titleColor: "#fff",
    video: "https://assets.mixkit.co/videos/preview/mixkit-programming-codes-on-a-screen-close-up-41658-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
  {
    title: "全自動パン焼き機を作る話",
    titleColor: "#63a65e",
    video: "https://assets.mixkit.co/videos/preview/mixkit-lots-of-air-bubbles-rising-in-water-44766-large.mp4",
    thumbnail: "https://mixkit.imgix.net/videos/preview/mixkit-smoke-coming-out-of-charcoal-3452-0.jpg?q=80&auto=format%2Ccompress&w=460",
  },
];

