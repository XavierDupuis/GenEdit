import { EntryStacker } from '../util/entry-stacker';
import { ifAlreadyExistsPolicies, RootMapper } from '../util/root-mapper';
import { semanticParseLine } from './semantic/semantic-parse';
import { ReferenceMapper } from '@util/reference-mapper';
import { SyntaxicParseData, SyntaxicParseResult } from '@type/parse/2-syntaxic/syntaxic-parse-type-result';
import { syntaxicParseLine } from './syntaxic/syntaxic-parse';
import { SplitLineData, SplitLineResult } from '@type/parse/1-structural/split-line-result';
import { splitLine } from './structural/split-line';

export const parse = (lines: string[]): { rootMapper: RootMapper; referenceMapper: ReferenceMapper } => {
    console.log(`Parsing ${lines.length} lines`);

    const hierarchicalStacker = new EntryStacker();
    const rootMapper = new RootMapper(ifAlreadyExistsPolicies.OVERWRITE);
    const referenceMapper = new ReferenceMapper();

    const splitLineResults = getSplitLineResults(lines);
    const syntaxicParseResults = getSyntaxicParseResults(splitLineResults);

    let lastKnownDepth = 0;
    let wasLastLineSkipped = false;
    for (const syntaxicParseResult of syntaxicParseResults) {
        if (!syntaxicParseResult.success) {
            console.log('Skipping syntaxic parsed result:', syntaxicParseResult.error);
            wasLastLineSkipped = true;
            continue;
        }

        if (wasLastLineSkipped && syntaxicParseResult.depth > lastKnownDepth) {
            const syntaxicParseResultContext = getSyntaxicParseResultContext(syntaxicParseResult);
            console.log(
                `Skipping syntaxic parsed result: '${syntaxicParseResultContext}' `,
                `This result is deeper (${syntaxicParseResult.depth}) than last known parsed ancestor (${lastKnownDepth})`
            );
            continue;
        }

        const result = semanticParseLine(syntaxicParseResult, hierarchicalStacker, referenceMapper, rootMapper);
        if (result.success) {
            lastKnownDepth = syntaxicParseResult.depth;
        } else {
            console.log('Semantic parse error', result.error);
        }
        wasLastLineSkipped = !result.success;
    }

    return { rootMapper, referenceMapper };
};

const getSplitLineResults = (lines: string[]): SplitLineResult[] => {
    const splitLineResults = [];
    for (const line of lines) {
        const splitLineResult = splitLine(line);
        if (!splitLineResult.success) {
            console.log(`Skipping line: '${line}' `, 'Split error', splitLineResult.error);
        }
        splitLineResults.push(splitLineResult);
    }
    return splitLineResults;
};

const getSyntaxicParseResults = (lines: SplitLineResult[]): SyntaxicParseResult[] => {
    const parseLineResults = [];
    for (const line of lines) {
        if (!line.success) {
            // Silent skip, was already logged
            continue;
        }
        const parseLineResult = syntaxicParseLine(line);
        if (!parseLineResult.success) {
            console.log(`Skipping line: '${getSplitLineResultContext(line)}' `, 'Parse error', parseLineResult.error);
        }
        parseLineResults.push(parseLineResult);
    }
    return parseLineResults;
};

const getSplitLineResultContext = (splitLineData: SplitLineData): string => {
    return `Depth '${splitLineData.first}', Second '${splitLineData.second}', Third '${splitLineData.third ?? '<Empty string>'}'`;
};

const getSyntaxicParseResultContext = (syntaxicParseData: SyntaxicParseData): string => {
    return `Depth '${syntaxicParseData.depth}', Tag '${syntaxicParseData.tag}', Xref '${syntaxicParseData.xref ?? '<Empty string>'}', Value '${syntaxicParseData.value ?? '<Empty string>'}'`;
};
