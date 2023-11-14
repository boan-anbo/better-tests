import {TestKinds} from "@src/stories/test-kinds.ts";

export const STORY_DEFAULTS = {
    DEFAULT_NARRATIVE: "The story goes",
    DEFAULT_WHO: "it",
}

export const STORY_TELLER = {
    LEFT_BRACKET: "[",
    RIGHT_BRACKET: "]",
    SPACE : " ",
}

export const GWT_DESCRIPTIONS = {
    GIVEN: "Given that",
    WHEN: "When",
    THEN: "Then",
}

export const COMMON_TEST_DESCRIPTIONS = {
    SHOULD_WORK: "should work",
    SHOULD_FAIL: "should fail",
    SHOULD_BE_TRUTHY: "should be truthy",
    SHOULD_BE_FALSY: "should be falsy",
    SHOULD_RENDER: "should render",
    SHOULD_NOT_RENDER: "should not render",
    SHOULD_PROVIDE_RESULT: "should provide result",
    SHOULD_NOT_PROVIDE_RESULT: "should not provide result",
}
export const COMMON_TEST_TAGS = {
    INTEGRATION: TestKinds.INTEGRATION,
    UNIT: TestKinds.UNIT,
    SMOKE: TestKinds.SMOKE,
    END_TO_END: TestKinds.END_TO_END,
    PERFORMANCE: TestKinds.PERFORMANCE,
    REGRESSION: TestKinds.REGRESSION,
    SECURITY: TestKinds.SECURITY,
    STRESS: TestKinds.STRESS,

}
