import { EventEmitter } from "../../events/EventEmitter"
import { Sequencer, SequencerStep } from "./Sequencer"
import { UpdateSequencerStepsEvent } from "./events/UpdateSequencerStepsEvent"
import { SetPatternCellEvent } from "./events/SetPatternCellEvent"

export class SequencerEmitter extends EventEmitter {
    constructor(private readonly sequencer: Sequencer) {
        super()

        this.on(UpdateSequencerStepsEvent, (event: UpdateSequencerStepsEvent) => {
            this.sequencer.steps = event.steps as SequencerStep
        })

        this.on(SetPatternCellEvent, (event: SetPatternCellEvent) => {
            this.sequencer.setCell(event.patternIndex, event.track, event.cell, event.value)
        })
    }
}
