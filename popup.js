// Wait until windows is loaded
document.addEventListener('DOMContentLoaded', function () {

  let checkPageButton = document.getElementById('toggle-issues');

  const validUrls = [
    'https://issues.joomla.org/tracker/joomla-cms/',
    'https://github.com/joomla/joomla-cms/pull/',
    'https://github.com/joomla/joomla-cms/issues/'
  ];

  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {

    let tablink = tabs[0].url;
    let checkUrl = false;

    validUrls.forEach((item, index) => {

      if (tablink.indexOf(item) !== -1) {
        checkUrl = true
      }
    })

    if (checkUrl == false) {
      checkPageButton.classList.add('d-none');
      document.getElementById('message').innerHTML = '<div class="alert alert-warning p-1 text-center" role="alert">No issue ID fount in URL</div>';
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
    window.close();
  });

  let imgWidth = document.getElementById('imgWidth');
  let imgHeight = document.getElementById('imgHeight');
  let searchTermValue = document.getElementById('searchTerm');
  let presetSize = document.getElementById('presetSize');
  let searchTerm = 'nature,woods';

  function constructUrl() {

    imgWidth.select();
    imgWidth.setSelectionRange(0, 99999); /* For mobile devices */

    imgHeight.select();
    imgHeight.setSelectionRange(0, 99999); /* For mobile devices */

    return 'https://picsum.photos/' + imgWidth.value + '/' + imgHeight.value;
  }

  presetSize.onchange = function () {

    let whValues = this.value.split('x');

    imgWidth.value = whValues[0];
    imgHeight.value = whValues[1];
  }

  // On click #oggleOffcanvas do something
  document.getElementById('selectUrlLink').onclick = function () {

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(constructUrl());
    document.getElementById("imgWidth").focus();
  }

  // On click #oggleOffcanvas do something
  document.getElementById('gotoUrlLink').onclick = function () {

    /* Goto URL */
    window.open(constructUrl(), '_blank', 'toolbar=0,location=0,menubar=0');
    window.close();
  }
}, false);
