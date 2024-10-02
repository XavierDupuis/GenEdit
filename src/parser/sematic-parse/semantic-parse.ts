import { isReferenceAttribute, ReferenceAttribute } from '@type/level-1B/reference-attribute';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { AttributableStacker } from '@util/attributable-stacker';
import { ReferenceMapper } from '@util/reference-mapper';
import { AttributeSemanticParseTypeHandler } from './attribute-semantic-parse-type-handler';
import { DatasetSemanticParseTypeHandler } from './dataset-semantic-parse-type-handler';
import { RecordSemanticParseTypeHandler } from './record-semantic-parse-type-handler';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { CompositeRecord } from '@type/level-3/composite-entry';
import { CompositeRecordMapper } from '@util/composite-record-mapper';

export class SemanticParseLineHandler {
    private parseTypeHandlers: SemanticParseTypeHandler[] = [
        new RecordSemanticParseTypeHandler(),
        new AttributeSemanticParseTypeHandler(),
        new DatasetSemanticParseTypeHandler(),
    ];

    public parse(
        syntaxicParseData: SyntaxicParseData,
        stack: AttributableStacker<CompositeAttribute>,
        referenceMapper: ReferenceMapper<ReferenceAttribute, CompositeAttribute>,
        compositeRecordMapper: CompositeRecordMapper<string, CompositeRecord>
    ): boolean {
        for (const handler of this.parseTypeHandlers) {
            const result = handler.handle(syntaxicParseData);
            if (result.handled) {
                const { handled: _, ...data } = result;
                // Required : push the attributable to the stack
                stack.push(data, syntaxicParseData.depth);
                // Optional : add the composite entry to the CompositeRecordMapper
                if ('id' in data) {
                    compositeRecordMapper.add(data);
                }
                // Optional : add the ReferenceAttribute to the ReferenceMapper
                if (isReferenceAttribute(data)) {
                    referenceMapper.tryAdd(data, stack.first);
                }
                return true;
            }
        }
        return false;
    }
}
