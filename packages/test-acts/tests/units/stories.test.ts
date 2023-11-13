import {describe, expect, it} from "vitest";
import {StoryTestFixture as af} from "../fixtures/story-test-fixture.ts";

describe(af.story, () => {
      it(af.scenes.describeAs.story, () => {
        const randomString = Math.random().toString();
        expect(af.tellAs((entity) => entity.story + randomString).toLowerCase()).toBe((af.story + randomString).toLowerCase());
    });

    it(af.scenes.describeFully.story, () => {
        const describeFullyTestAct = af.scenes.describeFully;
        expect(describeFullyTestAct.long()).toBe("Given that a given is provided, when asked to describe itself fully, then it should describe itself fully");
    })

    it(af.scenes.TELL_LONG_STORY_FALLBACK.story, () => {
        expect(af.scenes.TELL_LONG_STORY_FALLBACK.long()).toBe(af.scenes.TELL_LONG_STORY_FALLBACK.story);
    })

});


