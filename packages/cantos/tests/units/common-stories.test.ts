import {describe, expect, it} from "vitest";
import {COMMON_TEST_DESCRIPTIONS} from "@src/consts.ts";
import {CommonScenesFixture} from "../fixtures/common-scenes-fixture.ts";
import {CS} from "@src/index.ts";

describe(CommonScenesFixture.story, () => {
    it(CS.SHOULD_WORK.story, () => {
        expect(CS.SHOULD_WORK.story).toBe(COMMON_TEST_DESCRIPTIONS.SHOULD_WORK);
    });


});
