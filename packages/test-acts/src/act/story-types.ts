import {IStoryScript} from "@src/act/interfaces.ts";

/**
 * Export type alises for easier use for user-defined data.
 */
type IStoryScripts = Record<string, IStoryScript>;

/**
 * Type for used defined input data for an Act.
 */
type StoryScript = IStoryScript;

export type {StoryScript, IStoryScripts}

