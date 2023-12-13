//switch between form function
const switchForm = function (explorer, partner, explorerForm, partnerForm) {
    partner.addEventListener('click', function () {
        if (partnerForm.style.display = 'none') {
            partnerForm.style.display = 'flex';
            partner.style.backgroundColor = '#001F3F';
            partner.style.color = "#FFFFFF";
            
            explorerForm.style.display = 'none';
            explorer.style.color = '#001F3F';
            explorer.style.backgroundColor = '#FFFFFF';
        } 
    })

    explorer.addEventListener('click', function () {
        if (explorerForm.style.display = 'none') {
            partnerForm.style.display = 'none';
            partner.style.backgroundColor = '#FFFFFF';
            partner.style.color = "#001F3F";
            
            explorerForm.style.display = 'flex';
            explorer.style.color = '#FFFFFF';
            explorer.style.backgroundColor = '#001F3F';
        } 
    })
};

document.addEventListener('DOMContentLoaded', function() {
    const loginHealthExplorer = document.querySelector('.health_explorer_lg'); //gets login Health Explorer heading
    const loginHealthPartner = document.querySelector('.health_partner_lg'); //gets login Health Partner heading
    
    const healthExplorerLoginForm = document.getElementById('health_explorer_form_lg'); //gets Health Explorer login form
    const healthPartnerLoginForm = document.getElementById('health_partner_form_lg'); //gets Health Partner login form 
   
    switchForm(
        loginHealthExplorer, 
        loginHealthPartner, 
        healthExplorerLoginForm, 
        healthPartnerLoginForm
    );
    
});

document.addEventListener('DOMContentLoaded', function() {
    const signUphealthExplorer = document.querySelector('.health_explorer_sp'); //gets signup Health Explorer heading
    const signUpHealthPartner = document.querySelector('.health_partner_sp'); //gets signup Health Partner heading
    
    const healthExplorerSignUpForm = document.getElementById('health_explorer_form_sp'); //gets Health Explorer sign up form
    const healthPartnerSignUpForm = document.getElementById('health_partner_form_sp'); //gets Health Partner sign up form 
    
    
    switchForm(
        signUphealthExplorer, 
        signUpHealthPartner,  
        healthExplorerSignUpForm, 
        healthPartnerSignUpForm
    );    
});
