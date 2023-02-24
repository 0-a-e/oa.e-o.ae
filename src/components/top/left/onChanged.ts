const onChanged = (props: onChangedProps) => {
    const { state, activeIndex, containerRefs, from }: onChangedProps = props;
    const index: number =
        "localIndex" in props.index
            ? getinDefaultDataIndex(props.index.localIndex, state)
            : "globalIndex" in props.index
                ? props.index.globalIndex
                : 0;
    containerRefs[index].scrollIntoView({
        behavior: "smooth",
    });
    if (activeIndex.index !== index) {
        activeIndex.index = index;
        if (from == "mini") {
            activeIndex.isRefreshBigVideo = true;
        }
        state.miniVideoListData = createNewList(index, state);
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
