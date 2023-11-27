// Utility function to map descriptions to act records
// Utility function to map descriptions to act records
import {NameList} from "@src/util-types.ts";
import {Story, UserNameList, UserStories, UserStory} from "@src/stories/stories.ts";

import {DomainDef, IStory, IStoryScript, UserDomain} from "@src/stories/interfaces.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {StoryOptions} from "@src/stories/story-options.ts";

type StoryField = {
    story: string
}

function mapNameList<T extends NameList>(tell: T): Record<keyof T, StoryField> {
    return Object.keys(tell).reduce((acc, key) => {
        acc[key as keyof T] = {story: tell[key as keyof T]};
        return acc;
    }, {} as Record<keyof T, StoryField>);
}

export function loadList<T extends NameList, DOMAINS extends DomainDef>(descriptions: T): UserNameList<T, DOMAINS> {
    const result = mapNameList(descriptions);
    return loadScriptRecord(result) as unknown as UserNameList<T, DOMAINS>;
}

export function loadDomain<T extends DomainDef>(domain: T): UserDomain<T> {
    return domain
}

/**
 * This function creates an Act from a PartialAct.
 * @param partialEntity - The PartialAct to be converted into an Act.
 * @param opt - Optional parameters.
 * @returns A ReadonlyDeep Act.
 */
export function loadScript<SCRIPT extends IStoryScript<DOMAINS>, DOMAINS extends DomainDef>(partialEntity: SCRIPT, opt?: StoryOptions): UserStory<SCRIPT, DOMAINS> {
    const newStory = new Story(partialEntity, opt) as Story<DOMAINS>
    for (const actKey in newStory.scenes) {
        newStory.scenes[actKey] = instantiateStoriesRecursively(newStory.scenes[actKey]);
    }
    return newStory as UserStory<SCRIPT, DOMAINS>;
}

export function loadScriptRecord<SCRIPTS extends IStoryScripts<DOMAINS>, DOMAINS extends DomainDef>(actRecords: SCRIPTS): UserStories<SCRIPTS, DOMAINS> {
    const stories = {} as any;

    Object.keys(actRecords).forEach((actKey) => {
        const story: IStoryScript<DOMAINS> = actRecords[actKey as keyof SCRIPTS] as IStoryScript<DOMAINS>;
        stories[actKey as keyof SCRIPTS] = loadScript<typeof story, DOMAINS>(story);
    });
    return stories as UserStories<SCRIPTS, DOMAINS>;
}

function instantiateStoriesRecursively<T extends Story<DOMAIN>, DOMAIN extends DomainDef>(partialAct: IStory<DOMAIN>): T {
    const act = new Story(partialAct) as Story<DOMAIN>;
    for (const actKey in act.scenes) {
        act.scenes[actKey] = instantiateStoriesRecursively(act.scenes[actKey] as unknown as Story<DOMAIN>);
    }
    return act as T;
}

/**
 * Types for Records.
 */
export type Scenes<DOMAIN extends DomainDef> = Record<string, IStory<DOMAIN>>;
// Export entrance methods
