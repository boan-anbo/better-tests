import {describe, expect, it} from "vitest";
import {COMMON_TEST_DESCRIPTIONS} from "@src/consts.ts";
import {CommonActsFixture} from "../fixtures/common-acts-fixture.ts";
import {CD} from "@src/index.ts";

describe(CommonActsFixture.story, () => {
    it(CD.SHOULD_WORK.story, () => {
        expect(CD.SHOULD_WORK.story).toBe(COMMON_TEST_DESCRIPTIONS.SHOULD_WORK);
    });


});
