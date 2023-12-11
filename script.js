// const formValidation = selectedForm => {
//     const formElement = document.querySelector(selectedForm);

//         const validationOptions = [
//             {
//                 attribute: 'required',
//                 isValid: input => input.value.trim() !== '',
//                 errorMessage: (input, label) => `${label.textContent} is required`

//             }
//         ]


//         const validateEachDetail = formDetail => {
//             const label = formDetail.querySelector('label');
//             const input = formDetail.querySelector('input, textarea');
//             const errorContainer = formDetail.querySelector('.error');
//             // const errorIcon = formDetail.querySelector('.error_icon');
//             // const successIcon = formDetail.querySelector('.success_icon');

//             for (const option of validationOptions) {
//                 if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
//                     errorContainer.textContent = option.errorMessage(input, label);
//                 }
//             }

//         };


//     formElement.setAttribute('novalidate', '');

//     formElement.addEventListener('submit', (e) => {
//         e.preventDefault();

//         validateAllFormDetails(formElement);
//     })

//     const validateAllFormDetails = formToValidate => {
//         const formDetails = Array.from(document.querySelectorAll('.form_details'));

//         formDetails.forEach(formDetail => {
//             validateEachDetail(formDetail);
//         })
//     };
// }

// formValidation('#contact_form');



