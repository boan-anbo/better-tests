import {Story, TestKind} from "@src/stories/stories.ts";
import {Genres} from "@src/stories/story-kinds.ts";
import {Scenes} from "@src/entrance.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {StoryStatus} from "@src/stories/status.ts";
import {StoryOptions} from "@src/stories/story-options.ts";

export interface Test<CAST extends CastProfiles=typeof EmptyCast> {
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

    /**
     * FIXME: Not extending the actual type. Perhaps need a factory function, something like createTest which takes in a createdStory for type inference.
     * The a function with passed in root story and the current story that has the test, which should return an any to be used as the parameter for expect.
     */
    receivedAs?: (rootStory: Story<CAST>, currentStory: Story<CAST>) => any | Promise<any>;

    /**
     * FIXME: Not extending the actual type.
     * The a function with passed in root story and the current story that has the test, which should return an any to be used as the parameter for expect.
     */
    expectedAs?: (rootStory: Story<CAST>, currentStory: Story<CAST>) => any;

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
export type Who<T> = T extends Record<string, any> ? keyof T : never;
export type CastProfiles = Record<string, StoryActor>;

/**
 * Bare Act is the base structure for any entity or behavior without methods or nested entities.
 */
export interface IStoryScript<Cast extends CastProfiles = typeof EmptyCast> {
    /**
     * The optional protagonists of the story.
     *
     * @remark
     * It defaults to inherited who, and if it has not inherited any "who", it will default to "it".
     *
     * @example Override who for current story
     * Use it to override when the story does not make sense with the current parent story.
     * ```ts
     * {
     *     story: "MyApp",
     *     cast: myAppCast,
     *     who: ["MyApp"],
     *     scenes: {
     *         tellsWeather: {
     *             story: "tells the weather", // this makes sense without overriding the parent story's "who",
     *             context: {
     *             // Suppose tellsWeather features has a requirement that the location service must be enabled.
     *                 locationServiceEnabled: {
     *                 // This story does NOT make sense with the parents who--"MyApp" as in "MyApp is enabled" which will be wrong.
     *                     story: "isEnabled",
     *                     // So we override it with "LocationService". Now it reads "LocationService is enabled".
     *                     who: ["LocationService"],
     *                     }
     *                 }
     *             }
     *         }
     *     }
     *```
     *
     * @example Write stories in a way that needs no overriding `who`
     * You usually can avoid overriding who by using active voice and assigning important roles as the subject.
     * ```ts
     * const myAppStory = {
     *  story: "MyApp",
     *  cast: myAppCast,
     *  who: ["MyApp"],
     *  scenes: {
     *    tellsWeather: {
     *    story: "tells the weather",
     *    context: {
     *     hasLocationServicePrivilege: {
     *          story: "has location service privilege"
     *     }
     *     }
     *     }
     * }
     *
     * ```
     */
    who?: Who<Cast>[];
    /**
     * Text of the story
     *
     * @remarks
     * What "who" do(es).
     */
    story: string;
    scenes?: IStoryScripts<Cast>;
    /**
     * The order of the story among its sibling stories.
     */
    order?: number;
    cast?: Cast;
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


    context?: IStoryScripts<Cast>;

    when?: IStoryScripts<Cast>;

    then?: IStoryScripts<Cast>;

    so?: IStoryScripts<Cast>;

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
