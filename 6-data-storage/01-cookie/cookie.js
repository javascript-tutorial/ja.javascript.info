function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
<<<<<<< HEAD
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
=======
    "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
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
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
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
