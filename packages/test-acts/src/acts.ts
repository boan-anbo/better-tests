import {PartialDeep, ReadonlyDeep} from "type-fest";
import {ACTS, STATEMENTS} from "@src/consts.ts";


/**
 * Represents a collection of behaviors.
 */
export type Acts = Record<string, Act>;
export type ActRecords = Record<string, IActRecord>;
export type PartialActs = Record<string, Partial<Act>>;

export enum ActKindEntity {
    ACT = "ACT",
    ENTITY = "ENTITY",
    BEHAVIOR = "BEHAVIOR",
    // TODO: make sure all items under givens are all of this type.
    FEATURE = "FEATURE",
    DOMAIN = "DOMAIN",
    BACKGROUND = "BACKGROUND",
}


export enum ActKindGherkin {
    SCENARIO = "SCENARIO",
    GIVEN = "GIVEN",
    WHEN = "WHEN",
    THEN = "THEN",
}

export enum ActKindUserStory {
    STORY = "STORY",
    FEATURE = "FEATURE",
    STEP = "STEP",
    AS_A_USER = "AS_A_USER",
    I_WANT_TO = "I_WANT_TO",
    SO_THAT = "SO_THAT",
}

export type ActKindBDD = ActKindGherkin | ActKindUserStory;

export const ActKind = {
    ...ActKindEntity,
    ...ActKindGherkin,
    ...ActKindUserStory,
}

export type ActKind = ActKindEntity | ActKindBDD;


export enum TestKindTestType {
    /**
     * Quick and dirty way to determine whether something works at all.
     */
    SMOKE,
    /**
     * Default kind for an Act.
     */
    CORNER_CASE,
    UNIT,
    INTEGRATION,
    END_TO_END,
    PERFORMANCE,
    REGRESSION,
    SECURITY,
    STRESS,
    USABILITY,
}

export const TestKind = {
    ...TestKindTestType,
}

export type TestKind = TestKindTestType;


/**
 * Bare Act is the base structure for any entity or behavior without methods or nested entities.
 */
export interface IActRecord {
    /**
     * Description of the entity.
     *
     * @remarks
     * This field is intended to be used as the description of a test.
     * According to the actual type of entity, it should be worded accordingly.
     *
     * @example
     * ```ts
     * // For an entity, it should be worded as a noun.
     * const aDogEntity = createEntity({
     *   describe: "a dog",
     * })
     *
     * // For a behavior, it should be worded as a verb or an expectation.
     * const shouldBark = createBehavior({
     *  describe: "should bark", // alternatively: "barks", "can bark", "barking", etc.
     *  action: () => {
     *  // ...
     *  }
     *  })
     * ```
     */
    describe: string;
    actKind?: ActKind;
    testKind?: TestKind [];
    /**
     * Whether the act is already implemented.
     *
     * @default false
     */
    implemented?: boolean;
    /**
     * The name of a subject in this act.
     *
     * @remarks
     * When used in full description of the act, the subject, if provided, will be inserted as the subject of the description.
     */
    subject?: string;
    parentPath?: string;
    explain?: string;
    lastUpdate?: string;

    priority?: number;

    contexts?: IActRecord[];
    triggers?: IActRecord[];
    outcomes?: IActRecord[];
    acts?: ActRecords;
}


/**
 * Represents the base structure for any event within the system.
 */
export interface IAct extends IActRecord {
    acts: Acts;
    readonly testId: () => string;
    path: () => string;
    nextActToDo: (
    ) => Act | undefined;
}


class ActRecord implements IActRecord {
    describe: string = ACTS.BARE_ACT_DESCRIBE;
    parentPath?: string | undefined;
    actKind?: ActKind = ActKind.ACT;
    testKind?: TestKind [] = [];
    implemented?: boolean = false;
    subject?: string = "it";
    explain?: string;

    constructor(
        entity: Partial<IActRecord>,
        opt?: ActOptions,
    ) {
        if (opt?.defaultKind) {
            this.actKind = opt.defaultKind;
        }
        Object.assign(this, entity);
    }
}

type ActType = Act;

export type {ActType}

class Act extends ActRecord implements IAct {
    acts: Acts = {};
    contexts?: ActRecord[];
    triggers?: ActRecord[];
    outcomes?: ActRecord[];

    path = () => getPath(this.describe, this.parentPath)
    // get a getter to get test id
    testId = this.path;
    describeAs: (fn: (entity: Act) => string) => string;

    nextActToDo(): Act | undefined {
        return undefined
    }

    // Get the next act according to the priority and the implementation status of the act.


    constructor(
        entity: PartialDeep<ActRecord>,
        opt?: ActOptions,
    ) {
        super(entity, opt);
        Object.assign(this, entity);

        // populate entity
        populateActPath(this);

        // Use describeAs function if provided
        this.describeAs = (fn) => fn(this);
    }

    describeFully = () => gatherAllActsStatements(this);


}


enum STATEMENT_TYPE {
    GIVEN,
    WHEN,
    THEN,
}

function gatherAllActsStatements(entity: Act): string {
    const actName = entity.subject ?? ACTS.DEFAULT_ACT_NAME;
    const statements = [
        getActStatements(entity.contexts, STATEMENT_TYPE.GIVEN),
        getActStatements(entity.triggers, STATEMENT_TYPE.WHEN),
        getActStatements(entity.outcomes, STATEMENT_TYPE.THEN, actName),
    ]

    const collectedStatements = statements.filter(statement => statement).join(", ").trim();
    // if no collect statement or the statement is empty, fallback to description
    if (!collectedStatements || collectedStatements === "") {
        return entity.describe;
    } else {
        // return with first letter capitalized
        return collectedStatements.charAt(0).toUpperCase() + collectedStatements.slice(1);
    }

}

function getActStatements(acts: ActRecord[] | undefined, prefixType: STATEMENT_TYPE, actName?: string): string | undefined {
    if (!acts) {
        return undefined;
    }

    const actsLength = acts.length;
    if (actsLength === 0) {
        return undefined;
    }

    let prefix = "";
    switch (prefixType) {
        case STATEMENT_TYPE.GIVEN:
            prefix = STATEMENTS.GIVEN
            break;
        case STATEMENT_TYPE.WHEN:
            prefix = STATEMENTS.WHEN
            break;
        case STATEMENT_TYPE.THEN:
            prefix = STATEMENTS.THEN
            break;
        default:
            break;
    }

    const statement = acts.map((given, index) => {
        let statement = given.describe.trim();
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

export function createActs<T extends PartialActs>(partialActs: T): ReadonlyDeep<T> {
    const acts: T = {} as T;
    for (const actKey in partialActs) {
        acts[actKey as keyof T] = new Act(partialActs[actKey]) as T[keyof T];
    }
    return acts as ReadonlyDeep<T>;
}

function createActRecursive<T extends Act>(partialAct: PartialDeep<T>): T {
    const act = new Act(partialAct);
    for (const actKey in act.acts) {
        act.acts[actKey] = createActRecursive(act.acts[actKey]);
    }
    return act as T;
}

export interface ActOptions {
    defaultKind?: ActKind
    capitalizeKeywords?: boolean
}

/**
 * This function creates an Act from a PartialAct.
 * @param partialEntity - The PartialAct to be converted into an Act.
 * @param opt - Optional parameters.
 * @returns A ReadonlyDeep Act.
 */
export function createAct<T extends IActRecord>(partialEntity: T, opt?: ActOptions): ReadonlyDeep<T> {
    const newAct = new Act(partialEntity, opt);
    for (const actKey in newAct.acts) {
        newAct.acts[actKey] = createActRecursive(newAct.acts[actKey]);
    }
    return newAct as ReadonlyDeep<T>;
}

function populateActPath(actor: IAct): IAct {
    const actorPath = actor.describe;
    // populate entity acts
    for (const actKey in actor.acts) {
        actor.acts[actKey] = populatePath(actor.acts[actKey], actorPath);
    }
    return populatePath(actor);
}


/**
 * Util classes
 * @param entityDescribe
 * @param parentPath
 */

function getPath(entityDescribe: string, parentPath: string | undefined): string {
    return parentPath ? `${parentPath}.${entityDescribe}` : entityDescribe;
}

function populatePath<T extends IAct>(entity: T, parentPath?: string): T {
    // Add name to parentPath if any
    return {
        ...entity,
        path: getPath(entity.describe, parentPath),
    }
}

