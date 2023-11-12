import {loadScript} from "@src/entrance.ts";

export const CommonActsFixture = loadScript({
    story: "Common Acts Fixture",
    scenes: {
        shouldWork: {
            story: "Common Acts Should Work"
        }
    }
});

