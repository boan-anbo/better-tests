import {Scenes} from "@src/index.ts";
import {GWT_DESCRIPTIONS, STORY_DEFAULTS, STORY_TELLER} from "@src/consts.ts";
import {Story} from "@src/stories/stories.ts";
import {StoryOptions, StoryTag, StoryVersion} from "@src/stories/story-options.ts";
import {EmptyRecord, Test, Who} from "@src/stories/interfaces.ts";

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

export const printStory = (who: string, story: string) => joinByStoryTellerSpace([who, story]);

export const joinByStoryTellerSpace = (texts: string[]) => texts.join(STORY_TELLER.SPACE).trim();

export const printWho = (who: Who<any>[] | undefined) => who ? who.join(STORY_TELLER.SPACE) : STORY_DEFAULTS.DEFAULT_WHO

function gatherTags(story: Story, tags: StoryTag[]): string {
    const allTags: string [] = [];

    for (const tag of tags) {
        let tagText = '';
        switch (tag) {
            case StoryTag.Genre:
                tagText = story.type ? story.type : '';
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

const tellShortStory = (story: Story<any>): string => {
    let who = '';
    if (story.hasLongStory() || story.hasWho()) {

        who = printWho(story.who);
    }
    const storyText = story.story;
    return printStory(who, storyText);
}
const attachTags = (storyText: string, story: Story<any>, opts?: StoryOptions): string => {
    if (opts?.teller?.tags) {
        return gatherTags(story, opts?.teller?.tags) + STORY_TELLER.SPACE + storyText;
    }
    return storyText;
}
export function tellStory(story: Story<any>, version: StoryVersion): string {
    const opt = story.options;
    let storyText = '';
    switch (version) {
        case StoryVersion.SHORT:
            storyText = tellShortStory(story);
            break;
        case StoryVersion.LONG:
            storyText = tellLongStory(story);
            break;
        // if no preference specified, use the option preference or default to short
        case StoryVersion.NO_PREFERENCE:
        default:
            storyText = opt?.teller?.prefer === StoryVersion.LONG ? tellLongStory(story) : tellShortStory(story);
            break;
    }
    storyText = attachTags(storyText, story, opt);
    return storyText;


}

export function tellGWT(acts: Scenes<typeof EmptyRecord> | undefined, prefixType: STATEMENT_TYPE, actName?: string): string | undefined {

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

export function tellLongStory(entity: Story): string {
    const actName = entity.protagonist ?? STORY_DEFAULTS.DEFAULT_WHO;
    const statements = [
        tellGWT(entity.context, STATEMENT_TYPE.GIVEN),
        tellGWT(entity.action, STATEMENT_TYPE.WHEN),
        tellGWT(entity.outcome, STATEMENT_TYPE.THEN, actName),
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
