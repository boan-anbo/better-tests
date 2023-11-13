import {IStory} from "@src/act/interfaces.ts";

export function populatePath<T extends IStory<any>>(entity: T, parentPath?: string): T {
    // Add name to parentPath if any
    return {
        ...entity,
        path: getPath(entity.story, parentPath),
    }
}


export function populateActPath(actor: IStory<any>): IStory<any> {
    const actorPath = actor.story;
    // populate entity acts
    for (const actKey in actor.scenes) {
        actor.scenes[actKey] = populatePath(actor.scenes[actKey], actorPath);
    }
    return populatePath(actor);
}


/**
 * Util classes
 * @param entityDescribe
 * @param parentPath
 */

export function getPath(entityDescribe: string, parentPath: string | undefined): string {
    return parentPath ? `${parentPath}.${entityDescribe}` : entityDescribe;
}

