/**
 * This file showcases the basic usage of Cantos for designing and testing your APP.
 *
 * @remarks
 *
 * Following the steps below, and read the comments in the code, you will get a good idea of basic usage of Cantos and its potential benefits.
 *
 * @see https://github.com/boan-anbo/better-tests for more details.
 */
import {CastProfiles, CommonScences, loadCast, loadScript, StoryScript} from "@src/index";
import {describe, expect, it} from "vitest";


/**
 * Design your APP with Cantos
 *
 * @remarks
 *
 * The following section shows the design process using Cantos.
 */

// I. Define the building-block entities, or `cast`
//
// I.1. Provide the `cast` profiles, their roles, names, bios, etc.
// Imagine, if you will, you're the casting director of a movie, a movie of your APP.
// Or, think of it as the opportunity to think through on the "entities" or the "ontology" of your APP: what exists out there.
// If your APP is a planet, what are the species on it?
const myChatCastProfiles = {
    App: {
        role: 'App',
        roleBio: 'The chat app that connects the AI and the user',
        actor: "MyChat App"
    },
    AI: {
        role: 'AI',
        roleBio: 'The AI agent that powers the chat app',
        actor: "OpenAI ChatGPT-4"
    },
    User: {
        role: 'User',
        roleBio: 'The user of the chat app who chats with the AI about anything',
        actor: "You"
    },
    InternetConnection: {
        role: 'Internet',
        roleBio: 'The internet connection that connects the user and the AI which is only available on the cloud',
        actor: "User's Internet Provider"
    },
} satisfies CastProfiles // <-- `satisfies` is a Typescript feature to let you have auto-complete when you write your stories with these cast members later.

// I.2. Load the `cast` profiles you prepared easily into Cantos.
const myChatCast = loadCast(myChatCastProfiles)

// II. Write the `stories` of your APP
//
// II.1. Tells the features of your app from the user's perspective as a set of stories.
// If you need, imagine you're the screenwriter of the `MyChat` movie.
const myChatStory = {

    // We summarize the whole story/movie/feature in the root `story` field.
    story: "The user uses MyChat to chat with the AI",

    // We also provide the `cast` profiles we prepared earlier.
    cast: myChatCast, // <-- This let Cantos know which cast to use for your stories, so it can help you with auto-complete later.

    // The scenes that make up the story/movie/feature.
    scenes: {

        // Our first child `user story`, `scene`, behavior, or `scenario`---whatever you want to call it---is a simple one:
        USER_TALKS_TO_AI_BY_TYPING: {

            // This feature is so simple that it's almost self-explanatory: the user can type in the chat box.
            // So we only use the `story` field to describe it directly.
            story: "The user can talk to the AI by typing in the chat box",

        }, // <-- A `scence` is simply another StoryScript object with the exact same structure as the parent story.

        // Our second child `user story` is about the core functionality of our APP---how AI responds
        //
        // This is the most complicated scene is our little APP.
        // Its `user story` therefore, needs structure and clarity, which is exactly what Cantos can help you to manage.
        AI_RESPONDS_TO_THE_USER: {

            // We still have a short description of the `user story` in the `story` field, but this is far from enough in this case.
            story: "AI responds to the user",

            // This scenario involves several technical steps:
            // 1. Our app prepares the user's text in a special way required by the AI,
            // 2. Our app sends the prepared message to the AI, i.e. OpenAI API in our case,
            // 3. Our app receives the response from AI and parse its content, and
            // 4. App renders the response to the user.
            //
            // So we will use another (grandchild) level of `scenes` to describe these steps.
            scenes: {

                // 1. AI prepares the user's text in a special way,
                //
                // Before we write this story, we need change our frame of mind a little bit. Bear with me.
                //
                // From the technical perspective, yes, this step is about how the APP prepares the user's text.
                //
                // But from the user's perspective, preparation step is actually about something else.
                // In our example, it's actually about context-awareness. Here is why:
                // Our AI services needs previous messages between the user and the AI in order to understand what they have been talking about.
                //
                // For example, in the previous message, the user might have said "I'm hungry", and the AI might have responded "What do you want to eat?".
                // And then, the user might have replied "I don't know".
                // If we simply send the current "I don't know" to the AI, it will be confused because it doesn't know what the user is talking about: what is it that the user doesn't know about?
                //
                // That's why we need to prepare the user message in a special way to include the relevant previous messages, otherwise we can just trivially pass the user's current message to the AI.
                //
                // After doing the thinking, we realize this step is actually not a "technical step" but actually a feature for the user.
                // It's about a `feature` your APP provides to the user, not a `implementation detail` such as how this message is wrapped in a JSON object.
                // Ultimately, it's about the real value of your APP to the user.
                //
                // Therefore, we could write this story as something like `USER_CAN_CHAT_IN_CONTEXT` instead of `AI_PREPARES_USER_MESSAGE`. You will see the benefit of this approach soon.
                USER_CAN_CHAT_IN_CONTEXT: {

                    // Again, we will first use the `story` field to describe it directly, which is required, and will serve as default fallback narrative.
                    story: "When the user talks to the AI, the AI understands the context of the conversation",

                    // Then, we will use the `context`, `when`, and `who` fields to fully describe the story in more details.
                    //
                    // The context of the story:
                    context: {

                        userHasChatted:
                            {
                                who: ["User"],
                                story: "has been chatting with the AI for a while", // <-- This is the context of this scenario.
                            },
                        hasInternet:
                            {
                                who: ["InternetConnection"], // <-- This is another context of this scenario. This is too trivial to be really useful, but it's here to show that you can have multiple contexts.
                                story: "is working",
                            }
                    },
                    // When something happens:
                    when: {
                        userSendsAMessage:
                            {
                                who: ["User"],
                                story: "sent a new message", // <-- notice how you can ignore the "I" in the sentence because we provided the "who".
                            },
                    },
                    // Then something else should/can/will happen:
                    then: {
                        appWrapsMessage:
                            {
                                who: ["App", "AI"],
                                story: "include the previous messages in the new message before sending the bundle to AI", // <-- notice that a step can involve two roles, the App and the AI.
                            },
                    },
                    // So that...(the implications, consequences, or benefits etc.)
                    so: {
                        aiCanUnderstandTheContext:
                            {
                                who: ["AI"],
                                story: "can understand the context of the conversation",
                            },
                        userCanChatInContext:
                            {
                                who: ["User"],
                                story:
                                    "can feel like the AI is smart",
                            }
                        ,
                    },

                    // So on and so forth for the rest of the other 3 scenes.
                    //
                    // The key is always to remember that writing these stories are precious opportunity to think about what this process __really__ is and their purpose and meaning to the user.
                    //
                    // This is the most important part of the whole process. It has at least two main benefits:
                    // 1. to help you think about your APP and break it down into meaningful and, therefore, stable components.
                    // 2. to help you communicate with your teams about the APP and its features.
                    // 3. to help you test your APP and its features much more easily and fruitfully.
                },
            }
        }
    }
} satisfies StoryScript<typeof myChatCast>

// II.2 Now let's load your story script into Cantos to turn it into a powerful and reusable tool.
// The created story will provide intellisense, so you will know what scenes you have in your story as if you have a blueprint of your app in your hand when you test and implement your features one by one.
export const myChatStories = loadScript(myChatStory)

/**
 * TODO: Test your APP with Cantos
 */
describe(myChatStories.story, () => {

    const userTalksToAIByTyping = myChatStories.scenes.USER_TALKS_TO_AI_BY_TYPING
    describe(userTalksToAIByTyping.story, () => {
        it(CommonScences.SHOULD_WORK.story, () => {
            expect(true).toBe(true);
        });
    })

    const aiRespondsToTheUser = myChatStories.scenes.AI_RESPONDS_TO_THE_USER
    describe(aiRespondsToTheUser.story, () => {
        const userCanChatInContext = aiRespondsToTheUser.scenes.USER_CAN_CHAT_IN_CONTEXT
        describe(userCanChatInContext.story, () => {

            it(CommonScences.SHOULD_WORK.story, () => {
                expect(true).toBe(true);
            });

            describe(userCanChatInContext.long(), () => {
                it(CommonScences.SHOULD_WORK.story, () => {
                    expect(true).toBe(true);
                });
            })
        })
    })

})
