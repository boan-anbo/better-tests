import {Story} from "@src/act/stories.ts";

export const drawEntity = (entity: Story) : string => {
    let mermaidCode = `graph LR\n`;
    mermaidCode += `  ${entity.story.replace(/\s+/g, '_')}["${entity.story}"]\n`;

    for (const actKey in entity.scenes) {
        if (entity.scenes.hasOwnProperty(actKey)) {
            const act = entity.scenes[actKey];
            mermaidCode += `  ${entity.story.replace(/\s+/g, '_')} --> ${actKey.replace(/\s+/g, '_')}["${act.story}"]\n`;
        }
    }

    return mermaidCode;
}
