import { SyntaxicParseData } from '@type/parse/syntaxic-parse-type-result';
import { ReferenceMapper } from '@util/reference-mapper';
import { AttributeSemanticParseTypeHandler } from './attribute-semantic-parse-type-handler';
import { DatasetSemanticParseTypeHandler } from './dataset-semantic-parse-type-handler';
import { RecordSemanticParseTypeHandler } from './record-semantic-parse-type-handler';
import { SemanticParseTypeHandler } from './semantic-parse-type-handler';
import { HierarchicalStacker } from '@util/hierarchical-stacker';
import { IdentifiableHierarchicalAttribute } from '@type/level-3/hierarchical-attribute';
import { isRoot } from '@type/level-4/root';
import { RootMapper } from '@util/root-mapper';
import { isReference } from '@type/level-5/reference';

export class SemanticParseLineHandler {
    private parseTypeHandlers: SemanticParseTypeHandler[] = [
        new RecordSemanticParseTypeHandler(),
        new AttributeSemanticParseTypeHandler(),
        new DatasetSemanticParseTypeHandler(),
    ];

    public parse(
        syntaxicParseData: SyntaxicParseData,
        hierarchicalStacker: HierarchicalStacker<IdentifiableHierarchicalAttribute>,
        referenceMapper: ReferenceMapper,
        rootMapper: RootMapper
    ): boolean {
        for (const handler of this.parseTypeHandlers) {
            const result = handler.handle(syntaxicParseData);
            if (result.handled) {
                const { handled: _, ...data } = result;
                // Required : push the hierarchical to the HierarchicalStacker
                hierarchicalStacker.push(data, syntaxicParseData.depth);
                // Optional : add the root to the RootMapper
                if (isRoot(data)) {
                    rootMapper.add(data);
                }
                // Optional : add the reference to the ReferenceMapper
                if (isReference(data)) {
                    referenceMapper.tryAdd(data);
                }
                return true;
            }
        }
        return false;
    }
}
