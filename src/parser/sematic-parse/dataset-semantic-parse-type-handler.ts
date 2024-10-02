import { HEADER } from '@type/dataset/header';
import { TRAILER } from '@type/dataset/trailer';
import { DatasetTags } from '@type/tag/dataset-tag';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';

export class DatasetSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'dataset') {
            return { handled: false };
        }
        if (syntaxicParseData.tag === DatasetTags.HEAD) {
            return { handled: true, compositeEntry: HEADER, compositeAttribute: HEADER };
        }
        if (syntaxicParseData.tag === DatasetTags.TRLR) {
            return { handled: true, compositeEntry: TRAILER, compositeAttribute: TRAILER };
        }
        return { handled: false };
    }
}
