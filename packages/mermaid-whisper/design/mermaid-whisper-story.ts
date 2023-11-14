import {CastProfiles, loadCast, StoryScript} from "cantos";

const mwCastProfiles = {
    MW: {
        role: "Mermaid Whisper",
    },
    diagramHeader: {
        role: 'Header',
    }

} satisfies CastProfiles


const mwCast = loadCast(mwCastProfiles);

const mwStoryScript = {
    who: ['MW'],
    story: 'Mermaid Whisper Tests',
} satisfies StoryScript<typeof mwCast>
