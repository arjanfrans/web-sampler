import { SequencerStep } from "./Sequencer"
import { ArrayHelper } from "../../util/ArrayHelper"

export class PatternTrack {
    private data: boolean[] = []
    private _steps: SequencerStep

    constructor(steps: SequencerStep) {
        this._steps = steps

        this.clear()
    }

    public clear(): void {
        this.data = ArrayHelper.indexes(this._steps).map(() => false)
    }

    set steps(value: SequencerStep) {
        this._steps = value

        if (value > this._steps) {
            const slicedData = this.data.slice(0, value - this.data.length)

            this.data = this.data.concat(slicedData)
        } else if (value < this._steps) {
            this.data = this.data.slice(0, value)
        }
    }

    public setCell(index: number, value: boolean) {
        this.data[index] = value
    }

    public getSequence(): boolean[] {
        return this.data
    }
}
