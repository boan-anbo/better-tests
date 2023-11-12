import {Story, TestKind} from "@src/act/stories.ts";
import {Genres} from "@src/act/story-kinds.ts";
import {Scenes} from "@src/entrance.ts";
import {IStoryScripts} from "@src/act/story-types.ts";
import {StoryStatus} from "@src/act/status.ts";
import {StoryOptions} from "@src/act/story-options.ts";

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
/**
 * Bare Act is the base structure for any entity or behavior without methods or nested entities.
 */
export interface IStoryScript {
    /**
     * Description of the entity.
     *
     * @remarks
     * This field is intended to be used as the description of a test.
     * According to the actual type of entity, it should be worded accordingly.
     *
     * @example
     * ```ts
     * // For an entity, it should be worded as a noun.
     * const aDogEntity = createEntity({
     *   describe: "a dog",
     * })
     *
     * // For a behavior, it should be worded as a verb or an expectation.
     * const shouldBark = createBehavior({
     *  describe: "should bark", // alternatively: "barks", "can bark", "barking", etc.
     *  action: () => {
     *  // ...
     *  }
     *  })
     * ```
     */
    story: string;
    /**
     * Story-by-Story options that can override the global story options.
     */
    options?: StoryOptions;
    genre?: Genres;
    tests?: Record<string, Test>
    /**
     * The name of a subject in this act.
     *
     * @remarks
     * When used in full description of the act, the subject, if provided, will be inserted as the subject of the description.
     */
    protagonist?: string;
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

    context?: IStoryScript[];
    when?: IStoryScript[];
    then?: IStoryScript[];
    scenes?: IStoryScripts;
    tellAs?: (fn: (entity: Story) => string) => string;
}

export interface IStory extends IStoryScript {
    scenes: Scenes;
    readonly testId: () => string;
    path: () => string;
    nextActToDo: () => Story | undefined;

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
