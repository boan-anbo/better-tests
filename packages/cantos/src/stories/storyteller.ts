import {Scenes} from "@src/index.ts";
import {ACT_DEFAULT_DESCRIPTIONS, GWT_DESCRIPTIONS, STORY_TELLER} from "@src/consts.ts";
import {Story} from "@src/stories/stories.ts";
import {StoryTag, StoryVersion} from "@src/stories/story-options.ts";
import {EmptyCast, Test} from "@src/stories/interfaces.ts";

enum STATEMENT_TYPE {
    GIVEN,
    WHEN,
    THEN,
}

export const printTag = (tagText: string) => STORY_TELLER.LEFT_BRACKET + tagText.toUpperCase() + STORY_TELLER.RIGHT_BRACKET;

export const printTags = (tags: string[]) => tags.map(tag => printTag(tag)).join(STORY_TELLER.SPACE);

export const printTestTags = (tests: Test[]) => {
    const tags = tests.map(test => test.kind);
    return tags.length > 0 ? printTags(tags) : '';
}

function gatherTags(story: Story, tags: StoryTag[]): string {
    const allTags: string [] = [];

    for (const tag of tags) {
        let tagText = '';
        switch (tag) {
            case StoryTag.Genre:
                tagText = story.genre ? story.genre : '';
                break;
            case StoryTag.Status:
                tagText = story.status ? story.status : '';
                break;
            case StoryTag.Priority:
                tagText = story.priority ? story.priority.toString() : '';
                break;
        }

        const tagTextTrimmed = tagText.trim();

        if (tagTextTrimmed.length > 0) {
            allTags.push(tagTextTrimmed);

        }

    }

    return allTags.length > 0 ? printTags(allTags) : '';
}

export function tellStory(story: Story<any>, version: StoryVersion): string {
    const opt = story.options;
    let storyText = '';
    switch (version) {
        case StoryVersion.SHORT:
            storyText = story.story;
            break;
        case StoryVersion.LONG:
            storyText = gatherAllActsStatements(story);
            break;
        // if no preference specified, use the option preference or default to short
        case StoryVersion.NO_PREFERENCE:
        default:
            storyText = opt?.teller?.prefer === StoryVersion.LONG ? gatherAllActsStatements(story) : story.story;
            break;
    }
    if (opt?.teller?.tags) {
        storyText = gatherTags(story, opt?.teller?.tags) + STORY_TELLER.SPACE + storyText;
    }
    return storyText;


}

export function getActStatements(acts: Scenes<typeof EmptyCast> | undefined, prefixType: STATEMENT_TYPE, actName?: string): string | undefined {

    const actsLength = acts ? Object.keys(acts).length : 0;
    if (!acts) {
        return undefined;
    }

    if (actsLength === 0) {
        return undefined;
    }

    let prefix = "";
    switch (prefixType) {
        case STATEMENT_TYPE.GIVEN:
            prefix = GWT_DESCRIPTIONS.GIVEN
            break;
        case STATEMENT_TYPE.WHEN:
            prefix = GWT_DESCRIPTIONS.WHEN
            break;
        case STATEMENT_TYPE.THEN:
            prefix = GWT_DESCRIPTIONS.THEN
            break;
        default:
            break;
    }

    const statement = Object.entries(acts).map(([_, story], index) => {
        let statement = story.story.trim();
        // there are more than one given
        if (actsLength > 1) {
            // if it's not the first given, add a comma
            statement = index === 0 ? statement : `, ${statement}`;
            // if it's the second last given, add an "and" after the comma
            statement = index === actsLength - 2 ? `${statement} and` : statement;
            // if it's the last given, add a period after the comma
            statement = index === actsLength - 1 ? `${statement}.` : statement;
        }
        return statement.trim();
    }).join();

    return `${prefix.toLowerCase()} ${actName ? actName + ' ' : ''}${statement}`;
}

export function gatherAllActsStatements(entity: Story): string {
    const actName = entity.protagonist ?? ACT_DEFAULT_DESCRIPTIONS.DEFAULT_ACT_NAME;
    const statements = [
        getActStatements(entity.context, STATEMENT_TYPE.GIVEN),
        getActStatements(entity.when, STATEMENT_TYPE.WHEN),
        getActStatements(entity.then, STATEMENT_TYPE.THEN, actName),
    ]

    const collectedStatements = statements.filter(statement => statement).join(", ").trim();
    // if no collect statement or the statement is empty, fallback to description
    if (!collectedStatements || collectedStatements === "") {
        return entity.story;
    } else {
        // return with first letter capitalized
        return collectedStatements.charAt(0).toUpperCase() + collectedStatements.slice(1);
    }

}
