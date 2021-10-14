// Wait until windows is loaded
document.addEventListener('DOMContentLoaded', function () {

  let checkPageButton = document.getElementById('toggle-issues');

  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {

    let tablink = tabs[0].url;

    if (tablink.indexOf('joomla') == -1) {
      checkPageButton.classList.add('d-none');
    }
    return;
  })

  checkPageButton.addEventListener('click', function () {

    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function (tabs) {

      let tablink = tabs[0].url;

      if (tablink.indexOf('https://issues.joomla.org/tracker/joomla-cms/') !== -1) {

        let issueID = tablink.match('[0-9]+');

        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          let tab = tabs[0];
          chrome.tabs.update(tab.id, {
            url: 'https://github.com/joomla/joomla-cms/pull/' + issueID
          });
        })
      } else if (tablink.indexOf('https://github.com/joomla/joomla-cms/pull/') !== -1) {

        let issueID = tablink.match('[0-9]+');

        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          let tab = tabs[0];
          chrome.tabs.update(tab.id, {
            url: 'https://issues.joomla.org/tracker/joomla-cms/' + issueID
          });
        })

      } else if (tablink.indexOf('https://github.com/joomla/joomla-cms/issues/') !== -1) {

        let issueID = tablink.match('[0-9]+');

        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          let tab = tabs[0];
          chrome.tabs.update(tab.id, {
            url: 'https://issues.joomla.org/tracker/joomla-cms/' + issueID
          });
        })
      } else {
        alert('No issue ID found! Please visit the Joomla issue tracker!');
      }
    });
  });

  function constructUrl() {

    let imgWidth = document.getElementById('imgWidth');
    let imgHeight = document.getElementById('imgHeight');

    imgWidth.select();
    imgWidth.setSelectionRange(0, 99999); /* For mobile devices */

    imgHeight.select();
    imgHeight.setSelectionRange(0, 99999); /* For mobile devices */

    return 'https://source.unsplash.com/random/' + imgWidth.value + 'x' + imgHeight.value;
}

  // On click #oggleOffcanvas do something
  document.getElementById('selectUrlLink').onclick = function() {

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(constructUrl());
      document.getElementById("imgWidth").focus();

  }

  // On click #oggleOffcanvas do something
  document.getElementById('gotoUrlLink').onclick = function() {

      /* Goto URL */
      window.open(constructUrl(), '_blank', 'toolbar=0,location=0,menubar=0');

  }

}, false);
