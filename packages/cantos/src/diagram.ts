import { Story } from "@src/stories/stories";

export const drawEntity = (entity: Story<any>) : string => {
    let mermaidCode = `graph LR\n`;
    mermaidCode += `  ${entity.story.replace(/\s+/g, '_')}["${entity.story}"]\n`;

    for (const actKey in entity.scenes) {
        if (Object.prototype.hasOwnProperty.call(entity.scenes, actKey)) {
            const act = entity.scenes[actKey];
            mermaidCode += `  ${entity.story.replace(/\s+/g, '_')} --> ${actKey.replace(/\s+/g, '_')}["${act.story}"]\n`;
        }
    }

    return mermaidCode;
}
