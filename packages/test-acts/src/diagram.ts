import type { ActType} from ".";

export const drawEntity = (entity: ActType) : string => {
    let mermaidCode = `graph LR\n`;
    mermaidCode += `  ${entity.describe.replace(/\s+/g, '_')}["${entity.describe}"]\n`;

    for (const actKey in entity.acts) {
        if (entity.acts.hasOwnProperty(actKey)) {
            const act = entity.acts[actKey];
            mermaidCode += `  ${entity.describe.replace(/\s+/g, '_')} --> ${actKey.replace(/\s+/g, '_')}["${act.describe}"]\n`;
        }
    }

    return mermaidCode;
}
