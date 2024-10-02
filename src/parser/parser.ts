import { splitLine, SplitLineData, SplitLineResult } from './split-line';
import { AttributableStacker } from '../util/attributable-stacker';
import { ifAlreadyExistsPolicies, CompositeRecordMapper } from '../util/composite-record-mapper';
import { SemanticParseLineHandler } from './sematic-parse/semantic-parse';
import { ReferenceMapper } from '@util/reference-mapper';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { SyntaxicParseData, SyntaxicParseResult } from '@type/parse/syntaxic-parse-type-result';
import { syntaxicParseLine } from './syntaxic-parse-line/syntaxic-parse';

export const parse = (lines: string[]): { compositeRecordMapper: CompositeRecordMapper; referenceMapper: ReferenceMapper } => {
    console.log(`Parsing ${lines.length} lines`);

    const attributableStacker = new AttributableStacker<CompositeAttribute<string>>();
    const compositeRecordMapper = new CompositeRecordMapper(ifAlreadyExistsPolicies.OVERWRITE);
    const referenceMapper = new ReferenceMapper();
    const semanticParseLineHandler = new SemanticParseLineHandler();

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

        const syntaxicParseResultContext = getSyntaxicParseResultContext(syntaxicParseResult);
        if (wasLastLineSkipped && syntaxicParseResult.depth > lastKnownDepth) {
            console.log(
                `Skipping syntaxic parsed result: '${syntaxicParseResultContext}' `,
                `This result is deeper (${syntaxicParseResult.depth}) than last known parsed ancestor (${lastKnownDepth})`
            );
            continue;
        }

        const parsed = semanticParseLineHandler.parse(syntaxicParseResult, attributableStacker, referenceMapper, compositeRecordMapper);
        if (parsed) {
            lastKnownDepth = syntaxicParseResult.depth;
        } else {
            console.log(`Skipping line: '${syntaxicParseResultContext}' `, `Unhandled type '${syntaxicParseResult.type}'`);
        }
        wasLastLineSkipped = !parsed;
    }

    return { compositeRecordMapper, referenceMapper };
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
    switch (syntaxicParseData.type) {
        case 'attribute':
            return `Attribute with tag '${syntaxicParseData.tag}' and value '${syntaxicParseData.value ?? '<Empty string>'}'`;
        case 'record':
            return `Record with id '${syntaxicParseData.id}' and tag '${syntaxicParseData.tag}'`;
        case 'dataset':
            return `Dataset with tag '${syntaxicParseData.tag}'`;
    }
};
