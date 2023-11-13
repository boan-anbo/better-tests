import {UserStory} from "@src/stories/stories.ts";
import {StoryScript} from "@src/stories/story-types.ts";


// Re-export entrance methods
export * from "./entrance.ts";

// import and export entrance as Acts or A
import * as entrance from "./entrance.ts";
import { CommonScences, CommonTest, customizeCommonTests } from "./commons.ts";

// Export entrance as Cantos or C
export {entrance as Cantos, entrance as C};


// Export types for story
export type { StoryScript, UserStory,}

// export Common Test helpers
export {CommonScences as CS, CommonTest as CT, CommonScences, CommonTest, customizeCommonTests}

// Export types for cast
