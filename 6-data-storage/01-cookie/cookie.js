function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
<<<<<<< HEAD
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
=======
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
>>>>>>> 206485fc3a5465f961608b6e7303fae2e1a0e0b5
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

<<<<<<< HEAD
  if (options.expires.toUTCString) {
=======
  if (options.expires instanceof Date) {
>>>>>>> 206485fc3a5465f961608b6e7303fae2e1a0e0b5
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}


function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
