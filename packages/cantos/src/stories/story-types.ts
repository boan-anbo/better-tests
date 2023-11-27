import {DomainDef, EmptyRecord, IStoryScript} from "@src/stories/interfaces.ts";


/**
 * Export type alises for easier use for user-defined data.
 */
type IStoryScripts<Cast extends DomainDef> = Record<string, IStoryScript<Cast>>;

/**
 * Type for used defined input data for an Act.
 */
type StoryScript<Cast extends DomainDef = typeof EmptyRecord> = IStoryScript<Cast>;


export type {StoryScript, IStoryScripts, DomainDef}


