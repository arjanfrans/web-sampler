import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TransportView} from "./ui/audio/TransportView";
import {AudioEngine} from "./audio/AudioEngine";
import {CONFIG} from "./config";
import {AudioState} from "./audio/AudioState";

interface JukeboxState {
    audioState: AudioState
    isReady: boolean
}

export class Jukebox extends React.Component<{}, JukeboxState> {
    private readonly engine: AudioEngine;

    constructor(props: {}) {
        super(props);

        this.engine = new AudioEngine(CONFIG);

        this.state = {
            audioState: this.engine.state,
            isReady: false
        }

    }

    private async startEngine()
    {
        await this.engine.init();

        this.setState({
            isReady: true
        })
    }

    private renderStart(): React.ReactNode
    {
        return <div>
           <button onClick={() => this.startEngine()}>Start making music!</button>
        </div>
    }

    public render(): React.ReactNode {
        if (!this.state.isReady) {
            return this.renderStart();
        }

        return <>
            <TransportView
                engine={this.engine}
            />
        </>
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Jukebox/>
        <hr/>
        &copy; Arjan Frans 2020 | <a target="_blank" rel="noopener noreferrer" href="https://github.com/arjanfrans/web-sampler">Source Code</a>
    </React.StrictMode>,
    document.getElementById('root')
);

