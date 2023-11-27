import {UserStory} from "@src/stories/stories.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import {DomainDef, DomainObjectsDef, UserDomain, DomainEntity, DomainEvent, DomainCommand} from "@src/stories/interfaces.ts";
// import and export entrance as Acts or A
import * as entrance from "./entrance.ts";
import {CommonScences, CommonTest, customizeCommonTests} from "./commons.ts";
import {TestKind} from "@src/stories/stories.ts";


// Re-export entrance methods
export * from "./entrance.ts";

// Export entrance as Cantos or C
export {entrance as Cantos, entrance as C};


// Export types for story
export type {StoryScript, UserStory, DomainObjectsDef, DomainDef, UserDomain, DomainEntity, DomainEvent, DomainCommand}

// export Common Test helpers
export {CommonScences as CS, CommonTest as CT, CommonScences, CommonTest, customizeCommonTests}

// export TestKind
export {TestKind}
