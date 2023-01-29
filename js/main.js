import { initBigPicture } from './big-picture.js';
import { initUpload } from './image-upload.js';
import { initEffects } from './effects.js';
import { initValidation } from './form-validation.js';
import { getDataFromServer } from './api.js';

// renderPictures(data);
getDataFromServer();
initBigPicture();
initEffects();
initValidation();
initUpload();
