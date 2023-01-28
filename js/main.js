import { renderPictures } from './render.js';
import { data } from './data.js';
import { initBigPicture } from './big-picture.js';
import { initUpload } from './image-upload.js';
import { initEffects } from './effects.js';
import { initValidation } from './form-validation.js';

renderPictures(data);
initBigPicture();
initUpload();
initEffects();
initValidation();
