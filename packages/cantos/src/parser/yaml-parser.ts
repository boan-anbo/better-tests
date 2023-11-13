import YAML from 'yaml';
import * as fs from "fs";

/**
 * @
 * @param filePath
 */
export const loadFile = (filePath: string) => {
    return fs.readFileSync(filePath, 'utf-8');
}

export const parseYamlFile = (filePath: string) => {
    return parseYaml(loadFile(filePath));

}
export const parseYaml = (yamlString: string) => {
    return YAML.parse(yamlString);
}
