import {
  component$,
  useStylesScoped$,
  useContext,
  useStore,
  useClientEffect$,
} from "@builder.io/qwik";
import { activeIndexContext } from "..";
import styles from "../index.css?inline";

export default component$(({ data, containerSizes }) => {
  useStylesScoped$(styles);
  const state = useStore({
    data: data,
    defaultData: data,
    dataLength: data.length,
  });
  useClientEffect$(() => {
    state.data = createNewList(0, state);
  });

  console.log("reload");
  const activeIndex = useContext(activeIndexContext);
  return (
    <div
      class="miniVideosContainer"
      style={{ height: containerSizes.height.toString() + "px" }}
    >
      {state.data.map((miniVideo, i: number) => {
        return (
          <div
            class="miniVideoContainer"
            onClick$={() => {
              activeIndex.value = i;
              state.data = createNewList(i, state);
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
      })}
    </div>
  );
});

export const createNewList = (clickedIndex:number, state) => {
  let newData = [];
  const removeItem = state.data[clickedIndex];
  for (const item of state.defaultData) {
    if (JSON.stringify(item) !== JSON.stringify(removeItem)) {
      newData.push(item);
    }
  }
  return newData;
};
