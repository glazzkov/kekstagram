import { getPictureObjectsArray } from './data.js';
import { renderPictures } from './render.js';
import { initUpload } from './image-upload.js'
import {  initEffects } from './effects.js';
import { initValidation } from './form-validation.js';

const mainPicturesArray = getPictureObjectsArray();
renderPictures(mainPicturesArray);
initUpload();
initEffects();
initValidation();
