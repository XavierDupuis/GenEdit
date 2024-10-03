import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';

export class RecordSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'record') {
            return { handled: false };
        }
        return { handled: true, tag: syntaxicParseData.tag, id: syntaxicParseData.id, value: syntaxicParseData.id, attributes: [] };
    }
}
