import {PartialDeep, ReadonlyDeep} from "type-fest";
import {ACT_DEFAULT_DESCRIPTIONS} from "@src/consts.ts";
import {Scenes} from "@src/entrance.ts";

import {IStory, IStoryScript, Test} from "@src/act/interfaces.ts";
import {Genres} from "@src/act/story-kinds.ts";
import {getPath, populateActPath} from "@src/act/utils.ts";
import {TestKind} from "@src/act/test-kinds.ts";
import {printTag, printTestTags, tellStory} from "@src/act/storyteller.ts";
import {IStoryScripts} from "@src/act/story-types.ts";
import {NameList} from "@src/util-types.ts";
import {StoryOptions, StoryVersion} from "@src/act/story-options.ts";
import {StoryStatus} from "@src/act/status.ts";


class StoryScript implements IStoryScript {
    story: string = ACT_DEFAULT_DESCRIPTIONS.DEFAULT_NARRATIVE;
    parentPath?: string | undefined;
    genre?: Genres = Genres.ACT;
    implemented?: boolean = false;
    protagonist?: string = "it";
    explain?: string;
    options?: StoryOptions;

    constructor(
        entity: Partial<IStoryScript>,
        opt?: StoryOptions,
    ) {
        if (opt?.defaultKind) {
            this.genre = opt.defaultKind;
        }
        Object.assign(this, entity);


    }
}

export class Story extends StoryScript implements IStory {
    options?: StoryOptions;
    scenes: Scenes = {};
    context?: StoryScript[];
    when?: StoryScript[];
    then?: StoryScript[];
    status?: StoryStatus | string;
    priority?: number;

    path = () => getPath(this.story, this.parentPath)
    // get a getter to get test id
    testId = this.path;
    tellAs: (fn: (entity: Story) => string) => string;

    nextActToDo(): Story | undefined {
        return undefined
    }

    long = () => tellStory(this, StoryVersion.LONG);

    short = () => tellStory(this, StoryVersion.SHORT)
    tell = () => tellStory(this, StoryVersion.NO_PREFERENCE);

    /**
     * Tell the story but with test kinds as tag prefixes, e.g. `[UNIT] [E2E] Story`
     * @param tests
     */
    tellForTest = (tests: Test[]) => [printTestTags(tests), tellStory(this, StoryVersion.NO_PREFERENCE)].join(' ');

    /**
     * Print test's kinds as tags, e.g. `[UNIT] [E2E]`
     */
    printTestTags = (tests: Test[]) => printTestTags(tests);

    /**
     * Print the story as a tag, e.g. `[STORY]`
     *
     */
    printAsTag = () => printTag(this.tell());

    // Get the next act according to the priority and the implementation status of the act.


    constructor(
        entity: PartialDeep<StoryScript>,
        opt?: StoryOptions,
    ) {
        // if the provided story script has individual options set, use it to override the global options for this story
        const storyOptions = entity.options || opt;

        super(entity, storyOptions);
        Object.assign(this, entity);

        // store options
        this.options = storyOptions;

        // populate entity
        populateActPath(this);

        // Use describeAs function if provided
        this.tellAs = (fn) => fn(this);

    }


}

/**
 * Type for acts created with user-defined act records.
 *
 * @remarks
 * Represents an enhanced version of an `IActRecord` with additional methods from the `Act` class.
 * This type recursively applies itself to each nested act within the `acts` property, ensuring that
 * each nested act also receives the benefit of intellisense.
 *
 * The `acts` property is a mapped type that iterates over each key in the original `acts` property
 * of the provided `IActRecord`. For each key, it checks if the corresponding value extends `IActRecord`.
 * If it does, the type is recursively applied to this value, enhancing it with `Act` methods.
 * If it does not extend `IActRecord`, the type for that key is set to `never`, indicating an invalid type.
 *
 * This approach allows the `UserAct` type to maintain the original structure of the `IActRecord`,
 * including any nested acts, while also adding the methods and properties defined in the `Act` class.
 * As a result, instances of `ActWithMethods` have both the data structure defined by their specific `IActRecord`
 * implementation and the functionality provided by `Act`.
 *
 * @template T - A type extending `IActRecord` that represents the structure of the act record.
 *              This generic type allows `ActWithMethods` to be applied to any specific implementation
 *              of `IActRecord`, preserving its unique structure.
 */
export type UserStory<T extends IStoryScript> = ReadonlyDeep<T> & Story & {
    scenes: { [K in keyof T['scenes']]: T['scenes'][K] extends IStoryScript ? ReadonlyDeep<UserStory<T['scenes'][K]>> : never };
};

export type UserStories<T extends IStoryScripts> = ReadonlyDeep<{ [K in keyof T]: ReadonlyDeep<UserStory<T[K]>> }>;

export type UserNameList<T extends NameList> = ReadonlyDeep<{
    [K in keyof T]: ReadonlyDeep<UserStory<{
        story: T[K]
    }>>
}>;

export {TestKind};

