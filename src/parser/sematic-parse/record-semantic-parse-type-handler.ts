import { Record } from '@type/record/record';
import { SyntaxicParseData } from '../syntaxic-parse-line/syntaxic-parse';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';

export class RecordSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'record') {
            return { handled: false };
        }
        const record: Record = {
            tag: syntaxicParseData.tag,
            id: syntaxicParseData.id,
            attributes: [],
        };
        return { handled: true, attributable: record, rootable: record };
    }
}
