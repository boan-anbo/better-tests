import {Story, TestKind} from "@src/stories/stories.ts";
import type {StoryType} from "@src/stories/story-kinds.ts";
import {Scenes} from "@src/entrance.ts";
import {IStoryScripts} from "@src/stories/story-types.ts";
import {StoryStatus} from "@src/stories/status.ts";
import {StoryOptions} from "@src/stories/story-options.ts";

export interface Test<DOMAIN extends DomainDef = typeof EmptyDomain> {
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
    receivedAs?: (rootStory: Story<DOMAIN>, currentStory: Story<DOMAIN>) => any | Promise<any>;

    /**
     * FIXME: Not extending the actual type.
     * The a function with passed in root story and the current story that has the test, which should return an any to be used as the parameter for expect.
     */
    expectedAs?: (rootStory: Story<DOMAIN>, currentStory: Story<DOMAIN>) => any;

}


export interface DomainEvent {
    name: string;
}

export interface DomainCommand {
    name: string;
}

export interface Aggregate<T extends DomainObjects> {
    // root: keyof TObject['entities'];
    root: T extends DomainObjects ? (T['entities'] extends Record<string, DomainEntity> ? keyof T['entities'] : string) : string;

    [key: string]: any; // Allows arbitrary additional properties
}

export interface DomainEntity {
    // Unique identity of an entity
    id: string
    // Description of the entity
    bio?: string
}

export const DefaultEntities: Record<string, DomainEntity> = {};

export interface DomainObjects<
    TEntities extends Record<string, DomainEntity> = typeof DefaultEntities,
    TValues extends Record<string, any> = typeof EmptyRecord
> {
    entities?: TEntities;
    values?: Record<string, TValues>;
}


export interface DomainDef<
    TOBjects extends DomainObjects = typeof EmptyRecord,
    TEvents extends DomainEvent = DomainEvent,
    TCommands extends DomainCommand = DomainCommand,
> {
    subdomains?: Record<string, DomainDef<any>>;
    objects?: TOBjects;
    aggregates?: Record<string, Aggregate<TOBjects>>;
    events?: Record<string, TEvents>;
    commands?: Record<string, TCommands>;
}

export type DomainObjectsDef<T extends DomainObjects = DomainObjects> = T


export type UserDomain<T extends DomainDef> = T & DomainDef;


export interface RuleExamples {
    rule: string;
    examples: StringRecord
}

export const EmptyRecord = {} as const;
export const EmptyDomain: DomainDef<any> = {} as const;
// Dumb, or smart?, way to debug type inference: change never to a definite type, such as number, and see if `who` field inferre to that type, if it is, debug there, if not, move up the chain.
// Simplified type to extract entity keys from a domain
export type DomainEntityKeys<T extends DomainDef> = T['objects'] extends DomainObjects ? keyof T['objects']['entities'] : string;

// Revised Who<T> type using the simplified utility type
export type Who<T extends DomainDef> = {
    [K in keyof T]: T[K] extends DomainDef<any>
        ? DomainEntityKeys<T[K]>
        : string;
}[keyof T];

export type StringRecord = Record<string, string>;

/**
 * Bare Act is the base structure for any entity or behavior without methods or nested entities.
 */
export interface IStoryScript<DOMAIN extends DomainDef = typeof EmptyRecord> {
    /**
     * The actors of the story.
     *
     * @remark
     * It defaults to inherited who, and if it has not inherited any "who", it will default to "it".
     *
     * Use it to override when the story does not make sense with the current parent story.
     *
     * You usually can avoid overriding who by using active voice and assigning important roles as the subject.
     */
    who?: Who<DOMAIN>[];
    /**
     * Text of the story
     *
     * @remarks
     * What "who" do(es).
     */
    story: string;
    scenes?: IStoryScripts<DOMAIN>;
    /**
     * The order of the story among its sibling stories.
     */
    order?: number;
    domain?: DOMAIN;
    /**
     * Story-by-Story options that can override the global story options.
     */
    options?: StoryOptions;
    type?: StoryType;
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

    /**
     * A requirement, acceptance criterion, or a rule that the story, and its examples, must satisfy.
     *
     * @remarks
     * For documenting workshop activity, therefore only contains string values.
     * To formalize the rule, use {@link Story} under `scenes` instead.
     */
    rules?: Record<string, RuleExamples>;


    /**
     * Any tricky issues that are current unsolved.
     */
    questions?: StringRecord;


    /**
     * The context of the story.
     */
    context?: IStoryScripts<DOMAIN>;
    /**
     * The action of the story.
     */
    action?: IStoryScripts<DOMAIN>;
    /**
     * The outcome of the story.
     */
    outcome?: IStoryScripts<DOMAIN>;
    /**
     * The consequence of the story.
     */
    so?: IStoryScripts<DOMAIN>;

    tellAs?: (fn: (entity: Story<DOMAIN>) => string) => string;

    hasLongStory?: () => boolean;

}

export interface IStory<DOMAIN extends DomainDef = typeof EmptyDomain> extends IStoryScript<DOMAIN> {
    scenes: Scenes<DOMAIN>;
    testId: () => string;
    path: () => string;
    nextActToDo: () => Story<DOMAIN> | undefined;

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
