import { AttributableStacker } from '@util/attributable-stacker';
import { RootableMapper } from '@util/rootable-mapper';
import { SyntaxicParseData } from '../syntaxic-parse-line/syntaxic-parse';
import { AttributeSemanticParseTypeHandler } from './attribute-semantic-parse-type-handler';
import { DatasetSemanticParseTypeHandler } from './dataset-semantic-parse-type-handler';
import { RecordSemanticParseTypeHandler } from './record-semantic-parse-type-handler';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';

export class SemanticParseLineHandler {
    private parseTypeHandlers: SemanticParseTypeHandler[] = [
        new RecordSemanticParseTypeHandler(),
        new AttributeSemanticParseTypeHandler(),
        new DatasetSemanticParseTypeHandler(),
    ];

    public parse(syntaxicParseData: SyntaxicParseData, stack: AttributableStacker, mapper: RootableMapper): boolean {
        for (const handler of this.parseTypeHandlers) {
            const handlerResult = handler.handle(syntaxicParseData);
            if (handlerResult.handled) {
                stack.push(handlerResult.attributable, syntaxicParseData.depth);
                if (handlerResult.rootable) {
                    mapper.add(handlerResult.rootable);
                }
                return true;
            }
        }
        return false;
    }
}
