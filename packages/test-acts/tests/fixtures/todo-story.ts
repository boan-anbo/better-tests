import {loadScript, StoryScript} from "@src/index.ts";


const rawFixture  = {
    story: "Stories about a TODO list app",
    when: [
    ],
    scenes: {
        FIRST_ACT: {
            story: "A user can add a TODO item",
            scenes: {
                FIRST_GRAND_SON_ACT: {
                    story: "can be a sub-act",
                }
            }
        }
    }
} satisfies StoryScript;

/**
 * The fixture for the examples shown in the README.md
 */
export const ExampleFixture = loadScript(rawFixture)



