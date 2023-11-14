const DIRECTIONS = {
    // Left to right direction
    LR: 'LR',
    // Right to left direction
    RL: 'RL',
    // Left to right direction
    TD: 'TD',
    // Top to bottom direction
    TB: 'TB',
} as const;

export const FLOW_CHART_DEF = {
    DIAGRAM_TYPE: 'flowchart',
    DIRECTIONS
} as const;


