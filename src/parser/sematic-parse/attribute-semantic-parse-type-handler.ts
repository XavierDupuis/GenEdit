import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { CompositeAttribute } from '@type/level-3/composite-attribute';

export class AttributeSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'attribute') {
            return { handled: false };
        }
        const compositeAttribute: CompositeAttribute = {
            tag: syntaxicParseData.tag,
            value: syntaxicParseData.value,
            attributes: [],
        };
        return { handled: true, compositeAttribute };
    }
}
