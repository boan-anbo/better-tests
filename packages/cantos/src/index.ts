import {UserStory} from "@src/stories/stories.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import {DomainDef, DomainObjectsDef, UserDomain} from "@src/stories/interfaces.ts";
// import and export entrance as Acts or A
import * as entrance from "./entrance.ts";
import {CommonScences, CommonTest, customizeCommonTests} from "./commons.ts";


// Re-export entrance methods
export * from "./entrance.ts";

// Export entrance as Cantos or C
export {entrance as Cantos, entrance as C};


// Export types for story
export type {StoryScript, UserStory, DomainObjectsDef, DomainDef, UserDomain}

// export Common Test helpers
export {CommonScences as CS, CommonTest as CT, CommonScences, CommonTest, customizeCommonTests}

// Export types for cast
