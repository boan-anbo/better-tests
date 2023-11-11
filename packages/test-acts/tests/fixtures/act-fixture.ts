import { createAct } from "@src/acts.ts"

export const ActFixture = createAct({
    describe: "Act Test Fixture",
    acts: {
        describe: {
            describe: "can be described as",
        },
        describeAs: {
            describe: "can be described as",
        },
        DESCRIBE_FULLY_FALL_BACK: {
            describe: "can fallback to description if no full statements are provided",
        },
        describeFully: {
            describe: "can be described fully",
            contexts: [
                {
                    describe: "a given is provided"
                }
            ],
            triggers: [
                {
                    describe: "asked to describe itself fully"
                }
            ],
            outcomes: [
                {
                    describe: "should describe itself fully"
                }
            ]
        }
    }
})


