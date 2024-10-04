import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { Entry } from '@type/level-4/entry';

export class AttributeSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'attribute') {
            return { handled: false };
        }
        const attribute: Entry = {
            tag: syntaxicParseData.tag,
            value: syntaxicParseData.value,
            id: null,
            parent: null,
            children: [],
        };
        return { handled: true, ...attribute };
    }
}
