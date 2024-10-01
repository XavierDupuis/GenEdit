import { HEADER } from '@type/dataset/header';
import { TRAILER } from '@type/dataset/trailer';
import { DatasetTags } from '@type/tag/dataset-tag';
import { SyntaxicParseData } from '../syntaxic-parse-line/syntaxic-parse';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';

export class DatasetSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'dataset') {
            return { handled: false };
        }
        if (syntaxicParseData.tag === DatasetTags.HEAD) {
            return { handled: true, attributable: HEADER, rootable: HEADER };
        }
        if (syntaxicParseData.tag === DatasetTags.TRLR) {
            return { handled: true, attributable: TRAILER, rootable: TRAILER };
        }
        return { handled: false };
    }
}
