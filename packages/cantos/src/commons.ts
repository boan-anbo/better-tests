import {COMMON_TEST_DESCRIPTIONS, COMMON_TEST_TAGS} from "@src/consts.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {loadList} from "@src/entrance.ts";

/**
 *
 */
export const CommonScences = loadList(COMMON_TEST_DESCRIPTIONS);

export const CommonTest = loadList(COMMON_TEST_TAGS)

export const customizeCommonTests = <T extends IStoryScripts<any>>(behaviors: T) => {
    return {
        ...CommonScences,
        ...behaviors,
    }
}




