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
function EditRecipeSteps() {
    let rteObj;
    return (
        <div className="card mt-3" data-select2-id="18">
            <div className="card-header border-bottom my-n1">
                <div className="row my-n2" style={{"margin-left": "-1.2rem"}}>
                    <div className="col-6">
                        <div
                            style={{
                                "font-weight": "500",
                                "font-size": "1.285rem",
                                "margin-top": "0.4rem"
                            }}>
                            Steps
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className='mt-1 ms-n4 me-n4 mb-n3'>
                    <RichTextEditorComponent placeholder="Start typing you steps" width="100%" id="defaultRTE" ref={(richtexteditor) => {
                        rteObj = richtexteditor;
                    }}>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                    </RichTextEditorComponent>
                </div>
            </div>
        </div>
    );
}

export default EditRecipeSteps