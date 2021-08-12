import React from 'react';
import { Menu } from './Components/index';

import '../../../css/React/Editors/Tabless.css';

class ImageEditor extends React.Component
{
    render()
    {
        return (
            <div className='tabless-container'>
                <div className='tabless-editor'>
                    <Menu 
                        name='Size Settings'
                        content={[]}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Display Settings'
                        content={[]}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                    <Menu 
                        name='Image Corrections'
                        content={[]}
                        checkbox={{
                            displayCheckbox: false
                        }}
                    />
                </div>
            </div>
        );
    }
}

export { ImageEditor };