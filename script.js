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

//switching between forms

// //login
// const loginHealthExplorer = document.querySelector('.health_explorer_lg'); //gets login Health Explorer heading
// const loginHealthPartner = document.querySelector('.health_partner_lg'); //gets login Health Partner heading

// const healthExplorerLoginForm = document.getElementById('health_explorer_form_lg'); //gets Health Explorer login form
// const healthPartnerLoginForm = document.getElementById('health_partner_form_lg'); //gets Health Partner login form 

// const healthExplorerLoginStyle = window.getComputedStyle(healthExplorerLoginForm); 
// const healthPartnerLoginStyle = window.getComputedStyle(healthPartnerLoginForm);


// //sign_up
const signUphealthExplorer = document.querySelector('.health_explorer_sp'); //gets signup Health Explorer heading
const signUpHealthPartner = document.querySelector('.health_partner_sp'); //gets signup Health Partner heading

const healthExplorerSignUpForm = document.getElementById('health_explorer_form_sp'); //gets Health Explorer sign up form
const healthPartnerSignUpForm = document.getElementById('health_partner_form_sp'); //gets Health Partner sign up form 

const healthExplorerSignUpStyle = window.getComputedStyle(healthExplorerSignUpForm); 
const healthPartnerSignUpStyle = window.getComputedStyle(healthPartnerSignUpForm);



//switch between form function
// const switchForm = function (explorer, partner, explorerStyle, partnerStyle, explorerForm, partnerForm) {
//     partner.addEventListener('click', function () {
//         if (partnerStyle.getPropertyValue('display') === 'none') {
//             partnerForm.style.display = 'flex';
//             partner.style.background = '#1E1E1E';
//             partner.style.color = "#FFFFFF";
            
//             explorerForm.style.display = 'none';
//             explorer.style.color = '#1E1E1E';
//             explorer.style.background = '#FFFFFF';
//         } 
//     })

//     explorer.addEventListener('click', function () {
//         if (explorerStyle.getPropertyValue('display') === 'none') {
//             partnerForm.style.display = 'none';
//             partner.style.background = '#FFFFFF';
//             partner.style.color = "#1E1E1E";
            
//             explorerForm.style.display = 'flex';
//             explorer.style.color = '#FFFFFF';
//             explorer.style.background = '#1E1E1E';
//         } 
//     })
// };

const switchForm = function (explorer, partner, explorerStyle, partnerStyle, explorerForm, partnerForm) {
    for (let i = 0; i < 6; i++) {
        partner.addEventListener('click', function () {
            if (partnerStyle.getPropertyValue('display') === 'none') {
                partnerForm.style.display = 'flex';
                partner.style.backgroundColor = '#1E1E1E';
                partner.style.color = "#FFFFFF";
                
                explorerForm.style.display = 'none';
                explorer.style.color = '#1E1E1E';
                explorer.style.backgroundColor = '#FFFFFF';
            } 
        })
    
        explorer.addEventListener('click', function () {
            if (explorerStyle.getPropertyValue('display') === 'none') {
                partnerForm.style.display = 'none';
                partner.style.backgroundColor = '#FFFFFF';
                partner.style.color = "#1E1E1E";
                
                explorerForm.style.display = 'flex';
                explorer.style.color = '#FFFFFF';
                explorer.style.backgroundColor = '#1E1E1E';
            } 
        })
    }
};

function willRename() {
    // switchForm(
    //     loginHealthExplorer, 
    //     loginHealthPartner, 
    //     healthExplorerLoginStyle,
    //     healthPartnerLoginStyle, 
    //     healthExplorerLoginForm, 
    //     healthPartnerLoginForm
    // );
    
    switchForm(
        signUphealthExplorer, 
        signUpHealthPartner, 
        healthExplorerSignUpStyle,
        healthPartnerSignUpStyle, 
        healthExplorerSignUpForm, 
        healthPartnerSignUpForm
    );
    
}

willRename()
//