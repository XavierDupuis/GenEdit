import { SyntaxicParseData } from '@type/parse/2-syntaxic/syntaxic-parse-type-result';
import { ReferenceMapper } from '@util/reference-mapper';
import { RootMapper } from '@util/root-mapper';
import { SuccessOrErrorResult } from '@type/success-or-error-result';
import { isCrossReferencePointer } from '@type/cross-reference/cross-reference';
import { isDatasetTag } from '@type/tag/dataset-tag';
import { isRecordTag } from '@type/tag/record-tag';
import { isAttributeTag } from '@type/tag/attribute-tag';
import { EntryStacker } from '@util/entry-stacker';
import { SemanticParseTypeResult } from '@type/parse/3-semantic/semantic-parse-type-result';
import { Reference } from '@type/parse/3-semantic/level-3/reference';
import { Property } from '@type/parse/3-semantic/level-3/property';
import { Record } from '@type/parse/3-semantic/level-3/record';
import { Dataset } from '@type/parse/3-semantic/level-3/dataset';

export const semanticParseLine = (
    syntaxicParseData: SyntaxicParseData,
    stacker: EntryStacker,
    referenceMapper: ReferenceMapper,
    rootMapper: RootMapper
): SuccessOrErrorResult<SemanticParseTypeResult> => {
    const depth = syntaxicParseData.depth;
    const result = extractEntry(syntaxicParseData);
    if (!result.success) {
        return { success: false, error: result.error };
    }
    const entry = result.entry;
    // Required : push the hierarchical to the HierarchicalStacker
    stacker.push(entry, depth);
    // Optional : add the root to the RootMapper
    if (entry.type === 'record' || entry.type === 'dataset') {
        rootMapper.add(entry);
    }
    // Optional : add the reference to the ReferenceMapper
    if (entry.type === 'reference') {
        referenceMapper.tryAdd(entry);
    }
    return { success: true, entry };
};

const extractEntry = ({ depth, tag, value, xref }: SyntaxicParseData): SuccessOrErrorResult<SemanticParseTypeResult> => {
    const id = crypto.randomUUID();
    if (depth > 0) {
        if (isAttributeTag(tag)) {
            if (isCrossReferencePointer(value)) {
                const reference: Reference = {
                    type: 'reference',
                    id,
                    tag,
                    xref: null,
                    value,
                    parent: null,
                    children: [],
                };
                return { success: true, entry: reference };
            } else {
                const property: Property = {
                    type: 'property',
                    id,
                    tag,
                    xref: null,
                    value,
                    parent: null,
                    children: [],
                };
                return { success: true, entry: property };
            }
        }
    } else if (depth === 0) {
        if (isRecordTag(tag) && isCrossReferencePointer(xref)) {
            const record: Record = {
                type: 'record',
                id,
                tag,
                xref,
                value: null,
                parent: null,
                children: [],
            };
            return { success: true, entry: record };
        }
        if (isDatasetTag(tag)) {
            const dataset: Dataset = {
                type: 'dataset',
                id,
                tag,
                xref: null,
                value: null,
                parent: null,
                children: [],
            };
            return { success: true, entry: dataset };
        }
    }
    return { success: false, error: `Unhandled case with tag '${tag}', xref '${xref ?? '<Empty string>'}' and value '${value ?? '<Empty string>'}'` };
};
