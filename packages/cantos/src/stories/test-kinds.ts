export enum TestKinds {
    /**
     * Quick and dirty way to determine whether something works at all.
     */
    SMOKE = 'SMOKE',
    /**
     * Default kind for an Act.
     */
    CORNER_CASE = 'CORNER',
    UNIT = 'UNIT',
    INTEGRATION = 'INTEGRATE',
    END_TO_END = 'E2E',
    PERFORMANCE = 'PERF',
    REGRESSION = 'REGRESS',
    SECURITY = 'SECURITY',
    STRESS = 'STRESS',
    ACCEPTANCE = 'ACCEPTANCE',
}

export const TestKind = {
    ...TestKinds,
}

export type TestKind = TestKinds;

