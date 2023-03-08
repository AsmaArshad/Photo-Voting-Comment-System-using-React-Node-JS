const { check } = require('express-validator');
 
/*exports.photoValidation = [
    check('Photo_Path').not().isEmpty().withMessage('Photo_Path is required')
]
*/
exports.commentValidation = [
    check('Comments').not().isEmpty().withMessage('Comment is required')
]