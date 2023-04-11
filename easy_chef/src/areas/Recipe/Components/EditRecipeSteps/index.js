import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar
} from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import "./index.css";
import {forwardRef, useImperativeHandle, useState} from "react";

const EditRecipeSteps = forwardRef(({}, ref) => {
    const [steps, setSteps] = useState('')
    let rteObj;
    let toolbarSettings = {
        items: ['FontName', 'FontSize','Bold', 'Underline', 'BackgroundColor','|',
                'Alignments', 'CreateLink', 'Image', '|',
                'Undo', 'Redo', 'FullScreen'
        ],
        type: 'Expand'
    };
    let insertImageSettings = {
        saveFormat: "Base64"
    };

    useImperativeHandle(ref, () => ({
        getSteps() {
            return steps;
        },
        setSteps(steps){
            setSteps(steps)
        }
    }));



    function onStepsChanged(event) {
        if (event.value) {
            setSteps(event.value)
        }
        else{
            setSteps('')
        }
    }

    return (
        <div className="card mt-3" data-select2-id="18">
            <div className="card-header border-bottom my-n1">
                <div className="row my-n2" style={{"marginLeft": "-1.2rem"}}>
                    <div className="col-6">
                        <div
                            style={{
                                "fontWeight": "500",
                                "fontSize": "1.285rem",
                                "marginTop": "0.4rem"
                            }}>
                            Steps
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className='mt-1 ms-n4 me-n4 mb-n3'>
                    <RichTextEditorComponent toolbarSettings={toolbarSettings} value={steps} change={onStepsChanged} placeholder="Start typing you steps" insertImageSettings={insertImageSettings} width="100%"
                                             id="defaultRTE" ref={(richtexteditor) => {
                        rteObj = richtexteditor;
                    }}>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                    </RichTextEditorComponent>
                </div>
            </div>
        </div>
    );
})

export default EditRecipeSteps