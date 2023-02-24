const onChanged = (props: onChangedProps) => {
    const { state, activeIndex, containerRefs, from }: onChangedProps = props;
    containerRefs[getGlobalIndex(props.index, state)].scrollIntoView({
        behavior: "smooth",
    });
    if (activeIndex.index !== getGlobalIndex(props.index, state)) {
        activeIndex.index = getGlobalIndex(props.index, state);
        if (from == "mini") {
            activeIndex.isRefreshBigVideo = true;
        }
        state.miniVideoListData = createNewList(getGlobalIndex(props.index, state), state);
    }
};

export default onChanged;

export const getinDefaultDataIndex = (clickedIndex: number, state) => {
    let i = 0;
    for (const item of state.defaultData) {
        if (
            JSON.stringify(item) == JSON.stringify(state.miniVideoListData[clickedIndex])
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
    containerRefs: Array<Element>;
    from: "big" | "mini";
};

export const getGlobalIndex = (unknownIndex,state) => (
    "localIndex" in unknownIndex
      ? getinDefaultDataIndex(unknownIndex.localIndex, state)
      : "globalIndex" in unknownIndex
      ? unknownIndex.globalIndex
      : 0
);