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
                    <RichTextEditorComponent width="100%" id="defaultRTE" ref={(richtexteditor) => {
                        rteObj = richtexteditor;
                    }}>
                        <p>The Rich Text Editor steps components.</p>
                        <p><b>Steps:</b></p>
                        <ul>
                            <li>
                                <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                            </li>
                            <li>
                                <p>Capable of handling markdown editing.</p>
                            </li>
                            <li>
                                <p>Contains a modular library to load the necessary functionality on demand.</p>
                            </li>
                            <li>
                                <p>Provides a fully customizable toolbar.</p>
                            </li>
                            <li>
                                <p>Provides HTML view to edit the source directly for developers.</p>
                            </li>
                            <li>
                                <p>Supports third-party library integration.</p>
                            </li>
                            <li>
                                <p>Allows a preview of modified content before saving it.</p>
                            </li>
                            <li>
                                <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                            </li>
                            <li>
                                <p>Contains undo/redo manager.</p>
                            </li>
                            <li>
                                <p>Creates bulleted and numbered lists.</p>
                            </li>
                        </ul>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                    </RichTextEditorComponent>
                </div>
            </div>
        </div>
    );
}

export default EditRecipeSteps