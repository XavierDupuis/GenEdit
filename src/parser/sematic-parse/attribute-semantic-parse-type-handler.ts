import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SyntaxicParseData } from '../syntaxic-parse-line/syntaxic-parse';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { Attribute } from '@type/attribute/attribute';

export class AttributeSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'attribute') {
            return { handled: false };
        }
        const attribute: Attribute = {
            tag: syntaxicParseData.tag,
            value: syntaxicParseData.value,
            attributes: [],
        };
        return { handled: true, attributable: attribute };
    }
}
