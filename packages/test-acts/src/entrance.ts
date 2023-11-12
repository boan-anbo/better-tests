// Utility function to map descriptions to act records
// Utility function to map descriptions to act records
import {NameList} from "@src/util-types.ts";
import {Story, UserStory, UserStories, UserNameList} from "@src/act/stories.ts";

import {IStory, IStoryScript} from "@src/act/interfaces.ts";
import {IStoryScripts} from "@src/act/story-types.ts";
import {PartialDeep} from "type-fest";
import {StoryOptions} from "@src/act/story-options.ts";

type StoryField = {story: string}
function mapNameList<T extends NameList>(tell: T): Record<keyof T, StoryField> {
    return Object.keys(tell).reduce((acc, key) => {
        acc[key as keyof T] = {story: tell[key as keyof T]};
        return acc;
    }, {} as Record<keyof T, StoryField>);
}

export function loadList<T extends NameList>(descriptions: T): UserNameList<T> {
    const result = mapNameList(descriptions);
    return loadScriptRecord(result) as UserNameList<T>;
}

/**
 * This function creates an Act from a PartialAct.
 * @param partialEntity - The PartialAct to be converted into an Act.
 * @param opt - Optional parameters.
 * @returns A ReadonlyDeep Act.
 */
export function loadScript<T extends IStoryScript>(partialEntity: T, opt?: StoryOptions): UserStory<T> {
    const newAct = new Story(partialEntity, opt);
    for (const actKey in newAct.scenes) {
        newAct.scenes[actKey] = instantiateStoriesRecursively(newAct.scenes[actKey]);
    }
    return newAct as UserStory<T>;
}

export function loadScriptRecord<T extends IStoryScripts>(actRecords: T): UserStories<T> {
    const acts = {} as {
        [key in keyof T]: UserStory<T[Extract<keyof T, string>]>
    };
    for (const actKey in actRecords) {
        acts[actKey as keyof T] = loadScript(actRecords[actKey])
    }
    return acts as UserStories<T>;
}

function instantiateStoriesRecursively<T extends Story>(partialAct: PartialDeep<T>): T {
    const act = new Story(partialAct);
    for (const actKey in act.scenes) {
        act.scenes[actKey] = instantiateStoriesRecursively(act.scenes[actKey]);
    }
    return act as T;
}

/**
 * Types for Records.
 */
export type Scenes = Record<string, IStory>;
// Export entrance methods
