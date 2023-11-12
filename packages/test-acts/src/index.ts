import {UserStory} from "./act/stories.ts";
import {StoryScript} from "@src/act/story-types.ts";


// Re-export entrance methods
export * from "./entrance.ts";

// import and export entrance as Acts or A
import * as entrance from "./entrance.ts";
import { CommonDescribe, CommonTest, customizeCommonTests } from "./commons.ts";

export {entrance as Acts, entrance as A};


// Export types
export type { StoryScript, UserStory,}

// export Common Test helpers
export {CommonDescribe as CD, CommonTest as CT, CommonDescribe, CommonTest, customizeCommonTests}
