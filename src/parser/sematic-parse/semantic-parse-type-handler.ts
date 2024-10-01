import { SemanticParseTypeResult } from '@type/parse/semantic-parse-type-result';
import { SyntaxicParseData } from '../syntaxic-parse-line/syntaxic-parse';

export abstract class SemanticParseTypeHandler {
    abstract handle(syntaxicParseData: SyntaxicParseData): SemanticParseTypeResult;
}
