import {Genres} from "@src/act/story-kinds.ts";

export enum StoryVersion {
    NO_PREFERENCE = "NO_PREFERENCE",
    SHORT = "SHORT",
    LONG = "LONG",
}

export enum StoryTag {
    Genre = "Genre",
    Status = "Status",
    Priority = "Priority",
}

export interface StoryTellingOptions {
    /**
     * Whether to tell the story in short or long version when unspecified, i.e. when calling `tell()`
     */
    prefer?: StoryVersion
    tags?: StoryTag[]
}

export interface StoryOptions {
    defaultKind?: Genres
    capitalizeKeywords?: boolean
    teller?: StoryTellingOptions
}
