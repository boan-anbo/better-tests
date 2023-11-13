import {Story, TestKind} from "@src/stories/stories.ts";
import {Genres} from "@src/stories/story-kinds.ts";
import {Scenes} from "@src/entrance.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {StoryStatus} from "@src/stories/status.ts";
import {StoryOptions} from "@src/stories/story-options.ts";

export interface Test {
    /**
     * The type of tests.
     */
    kind: TestKind;
    /**
     * The condition when the test is considered done.
     */
    doneWhen?: string;
    /**
     * The issues that this test it closes.
     */
    closeIssues?: string[];

}

export interface StoryActor {
    role?: string;
    roleBio?: string;
    /**
     * The name of the role.
     */
    actor?: string;
    actorBio?: string;
}

export const EmptyCast = {} as const;
type KeysOfConst<T> = T extends Record<string, any> ? keyof T : never;
export type CastProfiles = Record<string, StoryActor>;

/**
 * Bare Act is the base structure for any entity or behavior without methods or nested entities.
 */
export interface IStoryScript<Cast extends CastProfiles = typeof EmptyCast> {
    scenes?: IStoryScripts<Cast>;
    /**
     * The order of the story among its sibling stories.
     */
    order?: number;
    cast?: Cast;
    /**
     * The short version of the story.
     */
    story: string;
    /**
     * Story-by-Story options that can override the global story options.
     */
    options?: StoryOptions;
    genre?: Genres;
    tests?: Record<string, Test>
    parentPath?: string;
    explain?: string;
    /**
     * The condition when the story is considered done.
     */
    done?: string;
    /**
     * The current status of the story
     */
    status?: StoryStatus | string;
    lastUpdate?: string;

    priority?: number;

    context?: IStoryScript<Cast>[];

    when?: IStoryScript<Cast>[];

    then?: IStoryScript<Cast>[];

    who?: KeysOfConst<Cast>[];


    tellAs?: (fn: (entity: Story<Cast>) => string) => string;
}

export interface IStory<CAST extends CastProfiles> extends IStoryScript<CAST> {
    scenes: Scenes<CAST>;
    readonly testId: () => string;
    path: () => string;
    nextActToDo: () => Story<CAST> | undefined;

    /**
     * Simply tell the story, using teller preference {@link StoryTellingOptions} to decide whether to tell the short or long version.
     */
    tell: () => string;

    /**
     * Tell the shorter version of the story using the story text.
     */
    short: () => string;
    /**
     * Tell the longer version of the story using the `contexts`, `when`, and `then`, in the form of, for example, `Given ... When ... Then ...`.
     *
     * @remarks
     * If a long description is not provided, it will fallback to the short version.
     */
    long: () => string;
}
