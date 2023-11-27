import {DomainDef, DomainObjectsDef} from "@src/stories/interfaces.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import { loadScript} from "@src/entrance.ts";

const dorothyObjects = {
    entities: {
        Dorothy: {
            id: "Dorothy",
        },
    },
    values: {
        hasBrain: true
    }
} satisfies DomainObjectsDef;


const scareCrowObjects = {
    entities: {
        Scarecrow: {
            id: "ScarecrowId",
        },

    },
    values: {
        hasBrain: false
    }
} satisfies DomainObjectsDef;

const scarecrowDomain = {
    objects: scareCrowObjects,
    aggregates: {
        scareCrowTheCharacter: {
            root: "Scarecrow",
            actorName: "Ray Bolger"
        }
    },
    events: {
        sawDorothy: {
            name: "sawDorothy"
        }
    }
} satisfies DomainDef<typeof scareCrowObjects>

const tinManObjects = {
    entities: {
        TinMan: {
            id: "TinManId",
        },

    },
    values: {
        hasHeart: false
    }
} satisfies DomainObjectsDef;

const tinManDomain: DomainDef<typeof tinManObjects> = {
    objects: tinManObjects,
    aggregates: {
        tinManTheCharacter: {
            root: "TinMan",
            actorName: "Jack Haley"
        }
    },
    events: {
        sawDorothy: {
            name: "sawDorothy"
        }
    }
} satisfies DomainDef<typeof tinManObjects>






const ozDomain = {
    subdomains: {
        scarecrowDomain,
        tinManDomain,
    },
    objects: dorothyObjects,
    aggregates: {
        dorothyTheCharacter: {
            root: "Dorothy",
            actorName: "Judy Garland"
        }
    },
    events: {
        thrownByHurricane: {
            name: "thrownByHurricane"
        }
    }

} satisfies DomainDef<typeof dorothyObjects>

const dorothyMeetsTheScarecrow = {
    story: "When Dorothy meets the Scarecrow",
    domain: ozDomain,
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
            action: {

                arrivesAtACrossRoad:
                    {
                        who: ["Dorothy"],
                        story: "arrives at a crossroad",
                    }
            },
            outcome: {

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
            action: {
                scareCrowToldDorothy:
                    {
                        who: ["Scarecrow"],
                        story: "told Dorothy which way to go",
                    }
            },
            outcome: {

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
} satisfies StoryScript<typeof  ozDomain>;

const dorothyMeetsTheLion = {
    story: "When Dorothy meets the Lion",
    domain: ozDomain,
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
            action: {
                theyHearsARoar: {
                    who: ["Dorothy", "Scarecrow", "TinMan"],
                    story: "hear a roar",
                }
            }
            ,
            outcome: {
                theyAreAfraid: {
                    who: ["Dorothy", "Scarecrow", "TinMan"],
                    story: "are afraid",
                }
            }
            ,
            order: 1,
        },
    }
} satisfies StoryScript<typeof ozDomain>;

const dorothyMeetsScarecrowAndLion = {
    story: "When Dorothy meets the Scarecrow and the Lion",
    domain: ozDomain,
    scenes: {
        dorothyMeetsTheScarecrow,
        dorothyMeetsTheLion,
    }
} satisfies StoryScript<typeof ozDomain>;

const dorothyMeetsHerCompanions = {
    story: "Dorothy meets her companions",
    domain: ozDomain,
    scenes: {
        dorothyMeetsScarecrowAndLion,
    }
} satisfies StoryScript<typeof ozDomain>;


/**
 * The fixture for the examples shown in the README.md
 */


export const wizardOfOzStory = loadScript(dorothyMeetsHerCompanions)

