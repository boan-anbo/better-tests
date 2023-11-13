


/**
 * Types for Act kinds.
 */
export enum GenreEntity {
    ACT = "ACT",
    ENTITY = "ENTITY",
    BEHAVIOR = "BEHAVIOR",
    DOMAIN = "DOMAIN",
    BACKGROUND = "BACKGROUND",
}


export enum GenreGherkin {
    SCENARIO = "SCENARIO",
    GIVEN = "GIVEN",
    WHEN = "WHEN",
    THEN = "THEN",
}

export enum GenreUserStory {
    EPIC = "EPIC",
    STORY = "STORY",
    FEATURE = "FEAT",
    STEP = "STEP",
    AS_A_USER = "AS A USER",
    I_WANT_TO = "I WANT TO",
    SO_THAT = "SO THAT",
}

export type GenreBDD = GenreGherkin | GenreUserStory;

export const Genres = {
    ...GenreEntity,
    ...GenreGherkin,
    ...GenreUserStory,
}

export type Genres = GenreEntity | GenreBDD;
