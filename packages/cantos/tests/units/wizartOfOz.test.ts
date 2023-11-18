import {describe, expect, it} from 'vitest'
import {wizardOfOzStory} from "../fixtures/wizard-of-oz-story.ts";

describe(wizardOfOzStory.tell(), () => {
    const dorothyMeetsScarecroAndLion = wizardOfOzStory.scenes.dorothyMeetsScarecrowAndLion;
    describe(dorothyMeetsScarecroAndLion.tell() , () => {
        const dorothyMeetsTheScareCrow = dorothyMeetsScarecroAndLion.scenes.dorothyMeetsTheScarecrow
            it(dorothyMeetsTheScareCrow.tell(), () => {

                expect(dorothyMeetsScarecroAndLion.tell().startsWith('it')).toBeFalsy()
            });
        });
})
