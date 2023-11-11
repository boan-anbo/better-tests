import {describe, expect, it} from "vitest";
import {CA} from "@src/index.ts";
import {COMMON_ACTS} from "@src/consts.ts";
import {CommonActsFixture} from "../fixtures/common-acts-fixture.ts";

describe(CommonActsFixture.describe, () => {
    it(CA.shouldWork.describe, () => {
        expect(CA.shouldWork.describe).toBe(COMMON_ACTS.SHOULD_WORK);
    });


});
