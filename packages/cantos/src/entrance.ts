// Utility function to map descriptions to act records
// Utility function to map descriptions to act records
import {NameList} from "@src/util-types.ts";
import {Story,  UserNameList, UserStories, UserStory} from "@src/stories/stories.ts";

import {CastProfiles, IStory, IStoryScript} from "@src/stories/interfaces.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {StoryOptions} from "@src/stories/story-options.ts";

type StoryField = { story: string }

function mapNameList<T extends NameList>(tell: T): Record<keyof T, StoryField> {
    return Object.keys(tell).reduce((acc, key) => {
        acc[key as keyof T] = {story: tell[key as keyof T]};
        return acc;
    }, {} as Record<keyof T, StoryField>);
}

export function loadList<T extends NameList, CAST extends CastProfiles>(descriptions: T): UserNameList<T, CAST> {
    const result = mapNameList(descriptions);
    return loadScriptRecord(result) as UserNameList<T, CAST>;
}

/**
 * This function creates an Act from a PartialAct.
 * @param partialEntity - The PartialAct to be converted into an Act.
 * @param opt - Optional parameters.
 * @returns A ReadonlyDeep Act.
 */
export function loadScript<SCRIPT extends IStoryScript<CAST>, CAST extends CastProfiles>(partialEntity: SCRIPT, opt?: StoryOptions): UserStory<SCRIPT, CAST> {
    const newAct = new Story(partialEntity, opt) as Story<CAST>
    for (const actKey in newAct.scenes) {
        newAct.scenes[actKey] = instantiateStoriesRecursively(newAct.scenes[actKey]);
    }
    return newAct as UserStory<SCRIPT, CAST>;
}

export function loadCast<CAST extends CastProfiles>(cast: CAST): CAST {
    return cast
}

export function loadScriptRecord<SCRIPTS extends IStoryScripts<CAST>, CAST extends CastProfiles>(actRecords: SCRIPTS): UserStories<SCRIPTS, CAST> {
    const acts = {} as any;

    Object.keys(actRecords).forEach((actKey) => {
        const story: IStoryScript<CAST> = actRecords[actKey as keyof SCRIPTS] as IStoryScript<CAST>;
        acts[actKey as keyof SCRIPTS] = loadScript<typeof story, CAST>(story);
    });
    return acts as UserStories<SCRIPTS, CAST>;
}

function instantiateStoriesRecursively<T extends Story<CAST>, CAST extends CastProfiles>(partialAct: IStory<CAST>): T {
    const act = new Story(partialAct) as Story<CAST>;
    for (const actKey in act.scenes) {
        act.scenes[actKey] = instantiateStoriesRecursively(act.scenes[actKey] as unknown as Story<CAST>);
    }
    return act as T;
}

/**
 * Types for Records.
 */
export type Scenes<CAST extends CastProfiles> = Record<string, IStory<CAST>>;
// Export entrance methods
