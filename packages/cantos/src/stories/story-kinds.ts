


/**
 * Types for Act kinds.
 */
export enum GenreEntity {
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

/**
 *
 */
export enum GenreSpec {
    RULE = "RULE",
    ACCEPTANCE_CRITERIA  = "ACCEPTANCE_CRITERIA",
    REQUIREMENT = "REQUIREMENT",
}

export enum GenreActivities {
    /**
     * A mapping workshop is a workshop where the participants map out the domain with `rules` and `examples`
     */
    EXAMPLE_MAPPING = "EXAMPLE_MAPPING",
    EVENT_STORMING = "EVENT_STORMING",
    DOMAIN_STORYTELLING = "DOMAIN_STORYTELLING",
    DOMAIN_MODELING = "DOMAIN_MODELING",
}

export enum GenreRuleType {
    /**
     * Rules that always apply
     */
    INVARIANT = "INVARIANT",
    /**
     * Rules that prevents the `command` to trigger at all if not satisfied
     */
    PRECONDITION = "PRECONDITION",

    /**
     * Rules that prevents the `event` to be triggered by command if not satisfied
     */
    POSTCONDITION = "POSTCONDITION",
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

export type GenreBDD = GenreGherkin | GenreUserStory | GenreSpec | GenreActivities | GenreRuleType;

export const StoryTypes = {
    ...GenreEntity,
    ...GenreGherkin,
    ...GenreUserStory,
    ...GenreSpec,
    ...GenreActivities,
}

export type StoryType = GenreEntity | GenreBDD;
