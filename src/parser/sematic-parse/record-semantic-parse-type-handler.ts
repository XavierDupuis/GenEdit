import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { CompositeEntry } from '@type/level-3/composite-entry';
import { Attributable } from '@type/level-1/attributable';
import { CompositeAttribute } from '@type/level-3/composite-attribute';

export class RecordSemanticParseTypeHandler extends SemanticParseTypeHandler {
    handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult {
        if (syntaxicParseData.type !== 'record') {
            return { handled: false };
        }
        const attributes: Attributable[] = [];
        const compositeEntry: CompositeEntry = {
            tag: syntaxicParseData.tag,
            id: syntaxicParseData.id,
            attributes,
        };
        const compositeAttribute: CompositeAttribute = {
            tag: syntaxicParseData.tag,
            value: syntaxicParseData.id,
            attributes,
        };
        return { handled: true, compositeAttribute, compositeEntry };
    }
}
