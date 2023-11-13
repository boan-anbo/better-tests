import {describe, expect, it} from "vitest";
import {loadScript} from "@src/entrance.ts";
import {StoryScript} from "@src/act/story-types.ts";
import {GenreUserStory} from "@src/act/story-kinds.ts";
import {StoryTag} from "@src/act/story-options.ts";
import {TestKinds} from "@src/act/test-kinds.ts";
import {CommonScences, CommonTest} from "@src/index";

const storyTellerScript = {
    story: "Story Teller",
    scenes: {

        storyTags: {
            story: "User can specify tags to print at the beginning of the story",
            explain: "For example, when the user specified \"Genre\", the printed story, no matter long or short, will have [GenreName] in front of it",
            genre: GenreUserStory.FEATURE,
            options: {
                teller: {
                    tags: [StoryTag.Genre, StoryTag.Priority]
                }
            }
        },
        storyTestTags: {
            story: "User can print any tests associated with a story when they need to on the fly",
            tests: {
                unit: {
                    kind: TestKinds.UNIT,
                },
                stress: {
                    kind: TestKinds.STRESS,
                    doneWhen: "It can handle 5000 people querying at the same time"
                }
            },
        }
    }
} satisfies StoryScript

const storyTellerStory = loadScript(storyTellerScript);


describe(storyTellerStory.short(), () => {
    it(CommonScences.SHOULD_WORK.story, () => {
        expect(CommonScences.SHOULD_WORK.story).toBe(CommonScences.SHOULD_WORK.story);
    });

    it(storyTellerStory.scenes.storyTags.tell(), () => {
        const storyTags = storyTellerStory.scenes.storyTags;
        expect(storyTags.tell()).toBe(`[FEAT] ${storyTags.story}`);
    });

    it(storyTellerStory.scenes.storyTestTags.tell(), () => {
        const storyTestTags = storyTellerStory.scenes.storyTestTags;
        expect(storyTestTags.printTestTags([storyTestTags.tests.unit])).toBe(CommonTest.UNIT.printAsTag());

        expect(storyTestTags.tellForTest([storyTestTags.tests.unit])).toBe(`${CommonTest.UNIT.printAsTag()} ${storyTestTags.story}`);
    });

});



