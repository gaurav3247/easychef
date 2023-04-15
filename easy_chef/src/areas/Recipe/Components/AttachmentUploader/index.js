import {createRoot} from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {SampleBase} from './sample-base';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import {createSpinner, showSpinner, hideSpinner} from '@syncfusion/ej2-react-popups';
import {detach, Browser, createElement, isNullOrUndefined, EventHandler} from '@syncfusion/ej2-base';
import api from "../../../../core/baseAPI";

export class Preview extends SampleBase {
    // Uploader component
    filesDetails = [];
    dropElement;
    filesList = [];
    filesName = [];
    files = [];
    uploadWrapper;
    parentElement;
    uploadObj;
    asyncSettings;
    allowedExtensions;
    dropArea;
    dropContainerRef;
    dropContainerEle;
    dropAreaRef;
    dropAreaEle;
    dropImageRef;
    dropImageEle;

    constructor(props) {
        super(props);
        this.dropAreaEle = null;
        this.dropContainerEle = null;
        this.dropImageEle = null;
        this.myRef = React.createRef();
        this.dropContainerRef = element => {
            this.dropContainerEle = element;
        };
        this.dropAreaRef = element => {
            this.dropAreaEle = element;
        };
        this.dropImageRef = element => {
            this.dropImageEle = element;
        };
        this.asyncSettings = {
            saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
        };
        this.allowedExtensions = '.jpg,.png,.jpeg';
    }

    rendereComplete() {
        try {
            console.log(this.props.id)
            if (this.props.id) {
                api.get(`/recipe/details/${this.props.id}/`)
                    .then((response) => {
                            if (this.files.length <= 0) {
                                if (isNullOrUndefined(this.dropArea.querySelector('.e-upload-files'))) {
                                    this.parentElement = createElement('ul', {className: 'e-upload-files text-center'});
                                    document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
                                }
                                let recipe = response.data;
                                this.files = recipe.attachments.map(i => i.attachment);
                                console.log(this.files)
                                for (let i = 0; i < this.files.length; i++) {
                                    const file = this.files[i];
                                    this.formSelectedData(file, this);
                                }
                            }
                        }
                    )
            }

            this.dropArea = this.dropAreaEle;
            this.dropElement = this.dropContainerEle;
            if (Browser.isDevice) {
                this.dropImageEle.style.padding = '0px 10%';
            }
            this.uploadObj.element.setAttribute('name', 'UploadFiles');
            document.getElementById('browse').onclick = () => {
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                return false;
            };
            document.getElementById('clearbtn').onclick = () => {
                if (!this.dropElement.querySelector('ul')) {
                    return;
                }
                detach(this.dropElement.querySelector('ul'));
                this.filesList = [];
                this.filesDetails = [];
                this.filesName = [];
                this.uploadObj.element.value = '';
                if (this.dropArea.classList.contains('e-spinner-pane')) {
                    hideSpinner(this.dropArea);
                    detach(this.dropElement.querySelector('.e-spinner-pane'));
                }
            };
            this.uploadObj.dropArea = this.dropElement;
            this.uploadObj.dataBind();
        } catch (error) {

        }
    }

    onSelect(args) {
        if (!this.dropElement.querySelector('li')) {
            this.filesDetails = [];
        }
        if (isNullOrUndefined(this.dropArea.querySelector('.e-upload-files'))) {
            this.parentElement = createElement('ul', {className: 'e-upload-files text-center'});
            document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
        }
        let validFiles = this.validateFiles(args, this.filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (let i = 0; i < validFiles.length; i++) {
            this.formSelectedData(validFiles[i], this);
        }
        this.filesDetails = this.filesDetails.concat(validFiles);
        args.cancel = true;
    }

    validateFiles(args, viewedFiles) {
        let modifiedFiles = [];
        let validFiles = [];
        let isModified = false;
        if (args.event.type === 'drop') {
            isModified = true;
            let allImages = ['png', 'jpg', 'jpeg'];
            let files = args.filesData;
            for (let file of files) {
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        let files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (this.filesName.length > 0) {
            for (let file of files) {
                if (this.filesName.indexOf(file.name) === -1) {
                    this.filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        } else {
            for (let file of files) {
                this.filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    formSelectedData(file, proxy) {
        let liEle = createElement('li', {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
        let imageTag = createElement('IMG', {className: 'upload-image', attrs: {'alt': 'Image'}});
        let wrapper = createElement('span', {className: 'wrapper'});
        wrapper.appendChild(imageTag);
        liEle.appendChild(wrapper);
//        liEle.appendChild(createElement('div', { className: 'file-name', innerHTML: file.name, attrs: { 'title': file.name } }));
//        liEle.appendChild(createElement('div', { className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
        let clearbtn;
//        let uploadbtn;
        clearbtn = createElement('span', {
            id: 'removeIcon',
            className: 'e-icons e-file-remove-btn ms-n2',
            attrs: {'title': 'Remove'}
        });
        EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
//        uploadbtn = createElement('span', { className: 'e-upload-icon e-icons e-file-remove-btn', attrs: { 'title': 'Upload' } });
//        uploadbtn.setAttribute('id', 'iconUpload');
//        EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
//        let progressbarContainer;
//        progressbarContainer = createElement('progress', { className: 'progressbar', id: 'progressBar', attrs: { value: '0', max: '100' } });
        liEle.appendChild(clearbtn);
//        liEle.appendChild(uploadbtn);
//        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file);
        document.querySelector('.e-upload-files').appendChild(liEle);
        proxy.filesList.push(liEle);
    }

    uploadFile(args) {
        this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
    }

    removeFiles(args) {
        let src = args.currentTarget.parentNode.childNodes[0].firstChild.attributes[2].nodeValue;

        let index = this.files.indexOf(src);
        this.filesList.splice(index, 1);
        this.files.splice(index, 1);
        this.filesDetails.splice(index, 1);
        detach(args.currentTarget.parentElement);
    }

    onFileUpload(args) {
        let li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle = li.querySelector('#iconUpload');
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    }

    onUploadSuccess(args) {
        let spinnerElement = document.getElementById('dropArea');
        let li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = () => {
                this.generateSpinner(this.dropArea);
            };
        } else {
            detach(li);
            hideSpinner(spinnerElement);
            detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        if (!isNullOrUndefined(li)) {
            li.setAttribute('title', args.e.currentTarget.statusText);
        }
    }

    generateSpinner(targetElement) {
        createSpinner({target: targetElement, width: '25px'});
        showSpinner(targetElement);
    }

    onUploadFailed(args) {
        let li = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        li.querySelector('.file-name').style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText);
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
    }

    readURL(li, args) {
        console.log(args)
        let preview = li.querySelector('.upload-image');

        if (args.rawFile) {
            let file = args.rawFile;
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                preview.src = reader.result;
            }, false);
            if (file) {
                reader.onload = () => {
                    this.files.push(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            preview.src = args
        }

    }

    onRemoveFile(args) {
        args.postRawFile = false;
    }

    render() {
        return (
            <div ref={this.myRef}>
                <div className='control-pane' ref={this.dropContainerRef}>
                    <div className='control-section' id='uploadpreview'>
                        <div className='col-lg-12'>
                            <div className='imagepreview'>
                                <div id='dropArea' ref={this.dropAreaRef} className='dropTarget'>
                            <span id='dropimage' ref={this.dropImageRef} className='file-name-drop'> Upload recipe images <a
                                href="" id='browse'><u>Browse</u></a> </span>
                                    <UploaderComponent id='previewfileupload' type='file'
                                                       ref={upload => this.uploadObj = upload}
                                                       asyncSettings={this.asyncSettings}
                                                       success={this.onUploadSuccess.bind(this)}
                                                       selected={this.onSelect.bind(this)}
                                                       removing={this.onRemoveFile.bind(this)}
                                                       progress={this.onFileUpload.bind(this)}
                                                       failure={this.onUploadFailed.bind(this)}
                                                       allowedExtensions={this.allowedExtensions}></UploaderComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;