import { Record } from '@type/record/record';
import { splitLine } from './split-line';
import { parseLine } from './parse-line';
import { Attribute } from '@type/attribute/attribute';
import { AttributableStacker } from '../util/attributable-stacker';
import { ifAlreadyExistsPolicies, TaggableRecordsMapper } from '../util/taggable-records-mapper';
import { HEADER } from '@type/dataset/header';
import { DatasetTags } from '@type/tag/dataset-tag';
import { TRAILER } from '@type/dataset/trailer';

export const parse = (lines: string[]): TaggableRecordsMapper => {
    console.log(`Parsing ${lines.length} lines`);

    const stacker = new AttributableStacker();
    const mapper = new TaggableRecordsMapper(ifAlreadyExistsPolicies.OVERWRITE);

    for (const line of lines) {
        const splitLineResult = splitLine(line);
        if (!splitLineResult.success) {
            console.log(`Skipping line: '${line}' `, 'Split error', splitLineResult.error);
            continue;
        }

        const parseLineResult = parseLine(splitLineResult);
        if (!parseLineResult.success) {
            console.log(`Skipping line: '${line}' `, 'Parse error', parseLineResult.error);
            continue;
        }

        if (parseLineResult.type === 'attribute') {
            const attribute: Attribute = {
                tag: parseLineResult.tag,
                value: parseLineResult.value,
                attributes: [],
            };
            stacker.push(attribute, parseLineResult.depth);
            continue;
        }

        if (parseLineResult.type === 'record') {
            const record: Record = {
                tag: parseLineResult.tag,
                id: parseLineResult.id,
                attributes: [],
            };
            stacker.push(record, parseLineResult.depth);
            mapper.add(record);
            continue;
        }

        if (parseLineResult.type === 'dataset') {
            if (parseLineResult.tag === DatasetTags.HEAD) {
                stacker.push(HEADER, parseLineResult.depth);
                continue;
            }
            if (parseLineResult.tag === DatasetTags.TRLR) {
                stacker.push(TRAILER, parseLineResult.depth);
                continue;
            }
            console.log(`Skipping line: '${line}' `, `Unhandled dataset tag '${parseLineResult.tag}'`);
        }

        console.log(`Skipping line: '${line}' `, `Unhandled type '${parseLineResult.type}'`);
    }

    return mapper;
};
