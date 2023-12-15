//current active link style
let runActiveLinkStyle = true;

function activeLinkColor() {
    if(!runActiveLinkStyle) {
        return
    };

    const allHeaderNavLinks = document.querySelectorAll('.general_div a');

    allHeaderNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          // Remove active class from all links
          allHeaderNavLinks.forEach(function(otherLink) {
            otherLink.classList.remove('active_link');
          });

          // Add active class to the clicked link
          link.classList.add('active_link');
        });
    });
};

activeLinkColor();
//

const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', function() {
    console.log(runActiveLinkStyle === false);
    runActiveLinkStyle = false;
});
