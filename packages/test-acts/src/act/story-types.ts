import {CastProfiles, EmptyCast, IStoryScript} from "@src/act/interfaces.ts";


/**
 * Export type alises for easier use for user-defined data.
 */
type IStoryScripts<Cast extends CastProfiles> = Record<string, IStoryScript<Cast>>;

/**
 * Type for used defined input data for an Act.
 */
type StoryScript<Cast extends CastProfiles=typeof EmptyCast> = IStoryScript<Cast>;


export type {StoryScript, IStoryScripts}

