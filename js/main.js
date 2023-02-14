// импорты компонентов
import { Body } from './components/Body.js';
import { ErrorMessage } from './components/ErrorMessage.js';
import { SuccessMessage } from './components/SuccessMessage.js';
import { Galery } from './components/Galery.js';
import { PictureViewer } from './components/PictureViewer.js';
import { UploadForm } from './components/UploadForm.js';
import { Thumbnail } from './components/Thumbnail.js';
import { Comment } from './components/Comment.js';
document.$appBody = document.body;

// регистрация компонентов
customElements.define('app-body', Body, { extends: 'body' });
customElements.define('app-error-message', ErrorMessage, { extends: 'section' });
customElements.define('app-success-message', SuccessMessage, { extends: 'section' });
customElements.define('app-galery', Galery, { extends: 'section' });
customElements.define('app-picture-viewer', PictureViewer, { extends: 'section' });
customElements.define('app-form', UploadForm, { extends: 'section' });
customElements.define('app-thumbnail', Thumbnail, { extends: 'a' });
customElements.define('app-comment', Comment, { extends: 'li' });
