import {loadScript} from "@src/entrance.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import {StoryTypes} from "@src/stories/story-kinds.ts";

// const exampleMappingProfiles = {
//     AI: {
//         role: "AI"
//     },
//     User: {
//         role: "User"
//     },
// } satisfies DomainDefs;

// const exampleMappingCast = loadDomains(exampleMappingProfiles);


const exampleMappingScript = {
    type: StoryTypes.EXAMPLE_MAPPING,
    story: "Chat App",
    // cast: exampleMappingCast,
    rules: {
        userMessageCannotBeTooLong: {
            rule: "User message cannot exceed 100 characters",
            examples: {
                userSendsMessageTooLong: "User sends message with 200 characters",
                userSendsMessageWithinLimit: "User sends message with 100 characters"
            }
        }
    },
    questions: {
        whatIfUserMessageTooShort: "What if the user's message is too short?"
    }
} satisfies StoryScript;

export const exampleMappingStory = loadScript(exampleMappingScript);
