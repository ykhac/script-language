# script-language

This is CLI command.<br/>
It will generate text which around by any function to object.

## Install
With npm
```
  npm install -g script-language
```

With yarn
```
  yarn global add script-language
```

## Usage
Run script in your code folder
```
  script-language
```

## Config

| Properties | Type | Description | Default
| --------------------- | -------------------- | -------------------- | -------------------- |
| **excludes** | array | Folder will be ignored | ["node_modules"] |
| **includes** | array | Folder will be run | ["src"] |
| **match** | string | File match | \^.*.(js\|ts\|jsx\|tsx)$ |
| **nameFunction** | string | Name of function contain text will be generated | "_t" |
| **pathJson** | string | Path and name of file will be generated | "./language.json" |
| **language** | array | List language | ["vi-VI", "en-EN"] |

## Example
```
  ...
  <div>{ _t("Sessions is expired.") }</div>

  ...
  <a>{_t("Sign in")}</a>  


  ...
  console.log(_t("You can reset password"))

  ...
  <button>{_t("Sent")}</button>
```

<br />

`language.json`
```
  {
    "Sessions is expired.": {
        "vi": "Sessions is expired.",
        "en": "Sessions is expired."
    },
    "Sign in": {
        "vi": "Sign in",
        "en": "Sign in"
    },
    "You can reset password": {
        "vi": "You can reset password",
        "en": "You can reset password"
    },
    "Send": {
        "vi": "Send",
        "en": "Send"
    }
  }
```