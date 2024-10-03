import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';

export abstract class SemanticParseTypeHandler {
    abstract handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult;
}
