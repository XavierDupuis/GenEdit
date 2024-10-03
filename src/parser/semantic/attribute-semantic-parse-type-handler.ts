import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';

export class AttributeSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'attribute') {
            return { handled: false };
        }
        return { handled: true, tag: syntaxicParseData.tag, value: syntaxicParseData.value, attributes: [] };
    }
}
