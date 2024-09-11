import {PartialDeep} from "type-fest";
import {STORY_DEFAULTS} from "@src/consts.ts";
import {Scenes} from "@src/entrance.ts";

import {DomainDef, EmptyRecord, IStory, IStoryScript, Test, Who} from "@src/stories/interfaces.ts";
import {getPath, populateActPath} from "@src/stories/utils.ts";
import {TestKind} from "@src/stories/test-kinds.ts";
import {printTag, printTestTags, printWho, tellStory} from "@src/stories/storyteller.ts";
import {NameList} from "@src/util-types.ts";
import {StoryOptions, StoryVersion} from "@src/stories/story-options.ts";
import {StoryType, StoryTypes} from "@src/stories/story-kinds.ts";
import {StoryStatus} from "@src/stories/status.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";


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


export class Story<DOMAIN extends DomainDef = typeof EmptyRecord> extends StoryScript implements IStory<DOMAIN> {
    action?: Scenes<DOMAIN>;
    context?: Scenes<DOMAIN>;
    outcome?: Scenes<DOMAIN>;
    so?: Scenes<DOMAIN>;
    who?: Who<DOMAIN>[];
    options?: StoryOptions;
    scenes: Scenes<DOMAIN> = {};
    priority?: number;
    status?: StoryStatus | string;


    domain?: DOMAIN;
    path = () => getPath(this.story, this.parentPath)
    // get a getter to get test id
    testId = this.path;
    tellAs: (fn: (entity: Story<DOMAIN>) => string) => string;

    nextActToDo(): Story<DOMAIN> | undefined {
        return undefined
    }

    appendAddendum = (story: string, addendum?: string) => addendum ? `${story} ${addendum}` : story;

    // FIXME: broken for new who, context, when, then, so
    long = (addendum?: string) => this.appendAddendum(tellStory(this, StoryVersion.LONG), addendum);

    short = (addendum?: string) => this.appendAddendum(tellStory(this, StoryVersion.SHORT), addendum);
    tell = (addendum?: string) => this.appendAddendum(tellStory(this, StoryVersion.NO_PREFERENCE), addendum);

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
    nameOfWho = (who: Who<DOMAIN>) => printWho([who]);

    getCasts = () => this.domain;

    // profileOfWho = (who: Who<CAST>) => {
    //     if (this.cast) {
    //         try {
    //
    //             return this.cast[who];
    //         } catch (e) {
    //             throw new Error(`Cast ${who} not found in ${this.cast}. Check if you had ${who} in the cast profiles.`)
    //         }
    //     }
    //     throw new Error(`You did not provide a cast for this story.`)
    // }

    hasLongStory = () => [this.context, this.action, this.outcome, this.so].some(story => story);
    hasWho = () => this.who && this.who.length > 0;


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
export type UserStory<T extends IStoryScript<DOMAINS>, DOMAINS extends DomainDef> = T & Story<DOMAINS> & {
    scenes: { [K in keyof T['scenes']]: T['scenes'][K] extends IStoryScript<DOMAINS> ? UserStory<T['scenes'][K], DOMAINS> : never };
    context: { [K in keyof T['context']]: T['context'][K] extends IStoryScript<DOMAINS> ? UserStory<T['context'][K], DOMAINS> : never };
    action: { [K in keyof T['action']]: T['action'][K] extends IStoryScript<DOMAINS> ? UserStory<T['action'][K], DOMAINS> : never };
    outcome: { [K in keyof T['outcome']]: T['outcome'][K] extends IStoryScript<DOMAINS> ? UserStory<T['outcome'][K], DOMAINS> : never };
    so: { [K in keyof T['so']]: T['so'][K] extends IStoryScript<DOMAINS> ? UserStory<T['so'][K], DOMAINS> : never };
};

export type UserCast<CAST extends DomainDef> = CAST;

export type UserStories<T extends IStoryScripts<CAST>, CAST extends DomainDef> = { [K in keyof T]: UserStory<T[K], CAST> };

export type UserNameList<Record extends NameList, CAST extends DomainDef> = {
    [EntryKey in keyof Record]: UserStory<{
        story: Record[EntryKey]
    }, CAST>
};

export {TestKind};

