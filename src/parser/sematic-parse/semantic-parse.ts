import { isReferenceAttribute, ReferenceAttribute } from '@type/level-1B/reference-attribute';
import { CompositeAttribute } from '@type/level-3/composite-attribute';
import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { AttributableStacker } from '@util/attributable-stacker';
import { ReferenceMapper } from '@util/reference-mapper';
import { AttributeSemanticParseTypeHandler } from './attribute-semantic-parse-type-handler';
import { DatasetSemanticParseTypeHandler } from './dataset-semantic-parse-type-handler';
import { RecordSemanticParseTypeHandler } from './record-semantic-parse-type-handler';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { CompositeEntry } from '@type/level-3/composite-entry';
import { CompositeEntryMapper } from '@util/composite-entry-mapper';

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
        compositeEntryMapper: CompositeEntryMapper<CompositeEntry>
    ): boolean {
        for (const handler of this.parseTypeHandlers) {
            const result = handler.handle(syntaxicParseData);
            if (result.handled) {
                const { compositeAttribute, compositeEntry } = result;
                // Required : push the attributable to the stack
                stack.push(compositeAttribute, syntaxicParseData.depth);
                // Optional : add the ReferenceAttribute to the ReferenceMapper
                if (isReferenceAttribute(compositeAttribute)) {
                    referenceMapper.tryAdd(compositeAttribute, stack.first);
                }
                // Optional : add the composite entry to the CompositeEntryMapper
                if (compositeEntry) {
                    compositeEntryMapper.add(compositeEntry);
                }
                return true;
            }
        }
        return false;
    }
}
