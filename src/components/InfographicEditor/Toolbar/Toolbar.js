import React from 'react';
import { ToolbarOptions } from './ToolbarOptions';
import { ToolbarContent } from './ToolbarContent';

import '../../../css/React/EditorToolbar.css';

class Toolbar extends React.Component 
{
    render()
    {
        return (
            <div className='editor-toolbar'>
                <ToolbarOptions 
                    displayHome={() => { this.props.displayHome(); }}
                    setToolbarContent={(content) =>  { this.props.setToolbarContent(content); }}/>
                <ToolbarContent 
                    display={this.props.toolbarContent}/>
                <hr className='toolbar-divider'/>
            </div>
        );
    }
}

export { Toolbar };