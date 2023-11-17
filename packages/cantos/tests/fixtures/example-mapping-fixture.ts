import {CastProfiles} from "@src/stories/interfaces.ts";
import {loadCast, loadScript} from "@src/entrance.ts";
import {StoryScript} from "@src/stories/story-types.ts";
import {StoryTypes} from "@src/stories/story-kinds.ts";

const exampleMappingProfiles = {
    AI: {
        role: "AI"
    },
    User: {
        role: "User"
    },
} satisfies CastProfiles;

const exampleMappingCast = loadCast(exampleMappingProfiles);


const exampleMappingScript = {
    type:  StoryTypes.EXAMPLE_MAPPING,
    story: "Chat App",
    cast: exampleMappingCast,
    rules: {
        userMessageCannotBeTooLong: {
            story: "User message cannot exceed 100 characters",
            examples: {
                userSendsMessageTooLong: {
                    story: "User sends message with 200 characters",
                },
                userSendsMessageWithinLimit: {
                    story: "User sends message with 100 characters",
                    rules: {
                        somethingElse: {
                            story   : "Something else",
                        }
                    }
                },
            }
        }
    },
} satisfies StoryScript<typeof exampleMappingCast>;

export const exampleMappingStory = loadScript(exampleMappingScript);


