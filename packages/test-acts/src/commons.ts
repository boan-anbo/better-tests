import {Acts, createActs} from "./acts.ts";
import {COMMON_ACTS} from "@src/consts.ts";

/**
 *
 */
export const CommonActs = createActs({
        shouldWork: {
            describe: COMMON_ACTS.SHOULD_WORK,
        }
});

export const customizeCommonBehaviors = <T extends Acts>(behaviors: Partial<T>) => {
    return {
        ...CommonActs,
        ...behaviors,
    }
}
