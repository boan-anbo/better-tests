import {PartialDeep, ReadonlyDeep} from "type-fest";
import {STORY_DEFAULTS} from "@src/consts.ts";
import {Scenes} from "@src/entrance.ts";

import {CastProfiles, EmptyCast, IStory, IStoryScript, Test, Who} from "@src/stories/interfaces.ts";
import {getPath, populateActPath} from "@src/stories/utils.ts";
import {TestKind} from "@src/stories/test-kinds.ts";
import {printTag, printTestTags, printWho, tellStory} from "@src/stories/storyteller.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {NameList} from "@src/util-types.ts";
import {StoryOptions, StoryVersion} from "@src/stories/story-options.ts";
import {StoryStatus} from "@src/stories/status.ts";
import {StoryType, StoryTypes} from "@src/stories/story-kinds.ts";


class StoryScript implements IStoryScript {
    story: string = STORY_DEFAULTS.DEFAULT_NARRATIVE;
    parentPath?: string | undefined;
    type?: StoryType = StoryTypes.STORY;
    implemented?: boolean = false;
    protagonist?: string = "it";
    explain?: string;
    options?: StoryOptions;


    constructor(
        entity: Partial<IStoryScript>,
        opt?: StoryOptions,
    ) {
        if (opt?.defaultKind) {
            this.type = opt.defaultKind;
        }
        Object.assign(this, entity);
    }
}

export interface Rule {
    rule: string;
    examples: string[];
}

export class Story<CAST extends CastProfiles = typeof EmptyCast> extends StoryScript implements IStory<CAST> {
    who?: Who<CAST>[];
    options?: StoryOptions;
    scenes: Scenes<CAST> = {};
    context?: Scenes<CAST>

    type?: StoryType = StoryTypes.STORY;
    action?: Scenes<CAST>;
    outcome?: Scenes<CAST>;
    status?: StoryStatus | string;
    priority?: number;


    cast?: CAST;
    path = () => getPath(this.story, this.parentPath)
    // get a getter to get test id
    testId = this.path;
    tellAs: (fn: (entity: Story<CAST>) => string) => string;

    nextActToDo(): Story<CAST> | undefined {
        return undefined
    }

    // FIXME: broken for new who, context, when, then, so
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
    printStoryAsTag = () => printTag(this.story);

    // Get the next act according to the priority and the implementation status of the act.

    /**
     * get all the names of the who
     */
    namesOfWho = () => printWho(this.who);

    /**
     * get the name of a cast member in the who
     * @param who
     */
    nameOfWho = (who: Who<CAST>) => printWho([who]);

    getCasts = () => this.cast;

    profileOfWho = (who: Who<CAST>) => {
        if (this.cast) {
            try {

                return this.cast[who];
            } catch (e) {
                throw new Error(`Cast ${who} not found in ${this.cast}. Check if you had ${who} in the cast profiles.`)
            }
        }
        throw new Error(`You did not provide a cast for this story.`)
    }


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
 * This type recursively applies itself to each nested act within the `stories` property, ensuring that
 * each nested act also receives the benefit of intellisense.
 *
 * @template T - A type extending `IActRecord` that represents the structure of the act record.
 *              This generic type allows `ActWithMethods` to be applied to any specific implementation
 *              of `IActRecord`, preserving its unique structure.
 */
export type UserStory<T extends IStoryScript<CAST>, CAST extends CastProfiles> = ReadonlyDeep<T> & Story<CAST> & {
    scenes: { [K in keyof T['scenes']]: T['scenes'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['scenes'][K], CAST>> : never };
    examples: { [K in keyof T['examples']]: T['examples'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['examples'][K], CAST>> : never };
    rules: { [K in keyof T['rules']]: T['rules'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['rules'][K], CAST>> : never };
    questions: { [K in keyof T['questions']]: T['questions'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['questions'][K], CAST>> : never };
    context: { [K in keyof T['context']]: T['context'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['context'][K], CAST>> : never };
    action: { [K in keyof T['action']]: T['action'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['action'][K], CAST>> : never };
    outcome: { [K in keyof T['outcome']]: T['outcome'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['outcome'][K], CAST>> : never };
    so: { [K in keyof T['so']]: T['so'][K] extends IStoryScript<CAST> ? ReadonlyDeep<UserStory<T['so'][K], CAST>> : never };
};

export type UserCast<CAST extends CastProfiles> = ReadonlyDeep<CAST>;

export type UserStories<T extends IStoryScripts<CAST>, CAST extends CastProfiles> = ReadonlyDeep<{ [K in keyof T]: ReadonlyDeep<UserStory<T[K], CAST>> }>;

export type UserNameList<T extends NameList, CAST extends CastProfiles> = ReadonlyDeep<{
    [K in keyof T]: ReadonlyDeep<UserStory<{
        story: T[K]
    }, CAST>>
}>;

export {TestKind};

