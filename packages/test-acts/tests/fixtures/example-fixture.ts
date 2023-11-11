import {Acts} from "@src/index.ts";

/**
 * The fixture for the examples shown in the README.md
 */
export const ExampleFixture = Acts.createAct({
    describe: "Example Fixture",
    acts: {
        HELPER_ACT: {
            describe: "can be a helper",
        }
    }
});
