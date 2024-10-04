import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { Record } from '@type/level-5/record';

export class RecordSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'record') {
            return { handled: false };
        }
        const record: Record = {
            tag: syntaxicParseData.tag,
            id: syntaxicParseData.id,
            value: null,
            parent: null,
            children: [],
        };
        return { handled: true, ...record };
    }
}
