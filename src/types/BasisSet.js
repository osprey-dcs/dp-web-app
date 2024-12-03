export default class BasisSet {

    constructor(description, dataBlocks, annotations = null) {
        this._description = description;
        this._dataBlocks = dataBlocks;
        this._annotations = annotations;
    }

    set dataBlocks(dataBlocks) {
        this._dataBlocks = dataBlocks;
    }

    get dataBlocks() {
        return this._dataBlocks;
    }

    addDataBlock(dataBlock) {
        this._dataBlocks.push(dataBlock);
    }

    set annotations(annotations) {
        this._annotations = annotations
    }

    get annotations() {
        return this._annotations;
    }

    addAnnotation(annotation) {
        this._annotations.push(annotation);
    }

}