import {loadScript} from "@src/entrance.ts";

export const StoryTestFixture = loadScript({
    story: "Story Test Fixture",
    scenes: {
        describe: {
            story: "can be described",
        },
        describeAs: {
            story: "can be described as",
        },
        TELL_LONG_STORY_FALLBACK: {
            story: "can fallback to description if no full statements are provided",
        },
        describeFully: {
            story: "can be described fully",
            context: [
                {
                    story: "a given is provided"
                }
            ],
            when: [
                {
                    story: "asked to describe itself fully"
                }
            ],
            then: [
                {
                    story: "should describe itself fully"
                }
            ]
        }
    }
})

