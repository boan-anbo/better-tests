import {beforeEach, describe, expect, it} from "vitest";
import {loadCast, loadScript} from "@src/entrance.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import {GenreUserStory} from "@src/stories/story-kinds.ts";
import {StoryTag} from "@src/stories/story-options.ts";
import {TestKinds} from "@src/stories/test-kinds.ts";
import {CastProfiles, CommonScences, CommonTest} from "@src/index";

const storyTellCastProfiles = {
    Tag: {
        role: "Tag",
    },
    Who: {
        role: "Who",
    },
    User: {
        role: "User",
    },
} satisfies CastProfiles

const storyTellerCast = loadCast(storyTellCastProfiles);

const storyTellerStoryWho = {
    who: ["Who"],
    cast: storyTellerCast,
    story: CommonScences.SHOULD_WORK.story,
    scenes: {
        tellWhoStory: {
            who: ["Who"],
            action: {
                tellCalled: {
                    story: "tell() is called",
                }
            },
            story: "is used with story to form a description",
            tests: {
                unit: {
                    kind: TestKinds.UNIT,
                    doneWhen: "The who is printed together with the story with default setting",
                },
            },
            scenes: {
                tellMultipleWhoStory: {
                    who: ["Who", "User"],
                    story: "can be used with multiple who",
                }
                // TODO: Add more corner cases for super many whos and more than 3 whos where the last who has "and" in front of it
            }
        }
    }
} satisfies StoryScript<typeof storyTellerCast>

const storyTellerStoryTags = {
    story: "Story Tags",
    scenes: {
        storyTags: {
            who: ["User"],
            story: "can specify tags to print at the beginning of the story",
            explain: "For example, when the user specified \"Genre\", the printed story, no matter long or short, will have [GenreName] in front of it",
            type: GenreUserStory.FEATURE,
            options: {
                teller: {
                    tags: [StoryTag.Genre, StoryTag.Priority]
                }
            }
        },
        storyTestTags: {
            story: "can print any tests associated with a story when they need to on the fly",
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
} satisfies StoryScript<typeof storyTellerCast>

const storyTellerScript = {
    story: "Story Teller",
    cast: storyTellerCast,
    scenes: {
        who: storyTellerStoryWho,
        tags: storyTellerStoryTags,
    }
} satisfies StoryScript<typeof storyTellerCast>

const storyTellerStory = loadScript(storyTellerScript);


describe(storyTellerStory.short(), () => {
    it(CommonScences.SHOULD_WORK.story, () => {
        expect(CommonScences.SHOULD_WORK.story).toBe(CommonScences.SHOULD_WORK.story);
    });

    const tagsStory = storyTellerStory.scenes.tags;

    describe(tagsStory.tell(), () => {
        it(tagsStory.scenes.storyTags.tell(), () => {
            const storyTags = tagsStory.scenes.storyTags;
            expect(storyTags.tell()).toBe(`[FEAT] ${storyTags.who[0]} ${storyTags.story}`);
        });

        let storyTestTags: typeof tagsStory.scenes.storyTestTags;
        beforeEach(() => {
            storyTestTags = tagsStory.scenes.storyTestTags;
        })

        it(tagsStory.scenes.storyTestTags.tell(), () => {
            expect(storyTestTags.printTestTags([storyTestTags.tests.unit])).toBe(CommonTest.UNIT.printStoryAsTag());

            expect(storyTestTags.tellForTest([storyTestTags.tests.unit])).toBe(`${CommonTest.UNIT.printStoryAsTag()} ${storyTestTags.tell()}`);
        });
    })

    const whoStory = storyTellerStory.scenes.who;

    describe(whoStory.tell(), () => {
        it(whoStory.scenes.tellWhoStory.tell(), () => {
            const tellWhoStory = whoStory.scenes.tellWhoStory;
            expect(tellWhoStory.tell()).toBe(`${tellWhoStory.who[0]} ${tellWhoStory.story}`);
        });

        it(whoStory.scenes.tellWhoStory.scenes.tellMultipleWhoStory.tell(), () => {
            const tellMultipleWhoStory = whoStory.scenes.tellWhoStory.scenes.tellMultipleWhoStory;
            expect(tellMultipleWhoStory.tell()).toBe(`${tellMultipleWhoStory.who.join(' ')} ${tellMultipleWhoStory.story}`);
        });
    });
});



