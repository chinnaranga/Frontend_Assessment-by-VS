// toolbar.js

import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import './styles/Toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar-section">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
            <div className="toolbar-section">
                <SubmitButton />
            </div>
        </div>
    );
};
