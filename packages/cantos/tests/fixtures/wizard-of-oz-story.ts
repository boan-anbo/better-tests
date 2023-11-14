import {loadCast, loadScript, StoryScript} from "@src/index.ts";
import {CastProfiles} from "@src/stories/interfaces.ts";


const wizardOfOzCastProfiles = {
    Dorothy: {
        role: "Dorothy Gale",
        roleBio: "A young girl from Kansas who is carried away to the magical Land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home.",
        actor: "Judy Garland",

    },
    Scarecrow: {
        role: "Scarecrow",
        actor: "Ray Bolger",
    },
    TinMan: {
        role: "Tin Woodman",
        actor: "Jack Haley",
    },
    Lion: {
        role: "Cowardly Lion",
        actor: "Bert Lahr",
    },
} satisfies CastProfiles;

const wizardOfOzCast = loadCast(wizardOfOzCastProfiles);


const dorothyMeetsTheScarecrow = {
    story: "When Dorothy meets the Scarecrow",
    cast: wizardOfOzCast,
    scenes: {
        DOROTHY_LOST_HER_WAY: {
            story: "Dorothy lost her way",
            context: {
                DorothyOnHerWayToTheCity: {
                    who: ["Dorothy"],
                    story: "is on her way to the City of Emeralds",
                }
            }
            ,
            when: {

                arrivesAtACrossRoad:
                    {
                        who: ["Dorothy"],
                        story: "arrives at a crossroad",
                    }
            },
            then: {

                wasConfused:
                    {
                        who: ["Dorothy"],
                        story: "is confused",
                    }
            }
            ,
            order: 1,
        },
        SCARECROW_GIVES_DIRECTION: {
            story: "The Scarecrow told Dorothy how to get to Emerald City",
            context: {
                ScarecrowAtTHeCrossRoad:
                    {
                        who: ["Scarecrow"],
                        story: "standing at the crossroad, and saw Dorothy",
                    }
            }
            ,
            when: {
                scareCrowToldDorothy:
                    {
                        who: ["Scarecrow"],
                        story: "told Dorothy which way to go",
                    }
            },
            then: {

                dorothyWasHappy:
                    {
                        who: ["Dorothy"],
                        story: "was happy",
                    }
            }
            ,
            order: 2,
        },
    }
} satisfies StoryScript<typeof wizardOfOzCast>;

const dorothyMeetsTheLion = {
    story: "When Dorothy meets the Lion",
    cast: wizardOfOzCast,
    scenes: {
        THREE_IN_THE_FOREST: {
            story: "The three were walking in the forest",
            context: {
                DorothyAndOthersInForest: {
                    who: ["Dorothy", "Scarecrow", "TinMan"],
                    story: "are walking in the forest",
                }
            }
            ,
            when: {
                theyHearsARoar: {
                    who: ["Dorothy", "Scarecrow", "TinMan"],
                    story: "hear a roar",
                }
            }
            ,
            then: {
                theyAreAfraid: {
                    who: ["Dorothy", "Scarecrow", "TinMan"],
                    story: "are afraid",
                }
            }
            ,
            order: 1,
        },
    }
} satisfies StoryScript<typeof wizardOfOzCast>;

const dorothyMeetsScarecrowAndLion = {
    story: "When Dorothy meets the Scarecrow and the Lion",
    cast: wizardOfOzCast,
    scenes: {
        dorothyMeetsTheScarecrow,
        dorothyMeetsTheLion,
    }
} satisfies StoryScript<typeof wizardOfOzCast>;

const dorothyMeetsHerCompanions = {
    story: "Dorothy meets her companions",
    cast: wizardOfOzCast,
    scenes: {
        dorothyMeetsScarecrowAndLion,
    }
} satisfies StoryScript<typeof wizardOfOzCast>;


/**
 * The fixture for the examples shown in the README.md
 */


export const wizardOfOzStory = loadScript(dorothyMeetsHerCompanions)



