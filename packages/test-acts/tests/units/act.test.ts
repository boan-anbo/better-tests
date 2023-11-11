import {describe, expect, it} from "vitest";
import {ActFixture as af} from "../fixtures/act-fixture.ts";

describe(af.describe, () => {
      it(af.acts.describeAs.describe, () => {
        const randomString = Math.random().toString();
        expect(af.describeAs((entity) => entity.describe + randomString).toLowerCase()).toBe((af.describe + randomString).toLowerCase());
    });

    it(af.acts.describeFully.describe, () => {
        const describeFullyTestAct = af.acts.describeFully;
        expect(describeFullyTestAct.describeFully()).toBe("Given that a given is provided, when asked to describe itself fully, then it should describe itself fully");
    })

    it(af.acts.DESCRIBE_FULLY_FALL_BACK.describe, () => {
        expect(af.acts.DESCRIBE_FULLY_FALL_BACK.describeFully()).toBe(af.acts.DESCRIBE_FULLY_FALL_BACK.describe);
    })

});
