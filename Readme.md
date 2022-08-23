# script-language

This is CLI command.<br/>
The `script-language` will generate text which around by any function to object.

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

## CLI command

| Flag         | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| **--outDir** | string | Path of folder consist will be generated |

## File language.config.json

| Properties       | Type               | Description                                     | Default                   |
| ---------------- | ------------------ | ----------------------------------------------- | ------------------------- |
| **excludes**     | array              | Folder will be ignored                          | ["node_modules"]          |
| **includes**     | array              | Folder will be run                              | ["src"]                   |
| **match**        | string             | File match                                      | \^.\*.(js\|ts\|jsx\|tsx)$ |
| **nameFunction** | string \| string[] | Name of function contain text will be generated | "\_t"                     |
| **outDir**       | string             | Path of folder consist will be generated        | "./language"              |
| **language**     | array              | List language                                   | ["vi-VI", "en-EN"]        |

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

`language/vi.json`

```
  {
    "Sessions is expired.": "Sessions is expired.",
    "Sign in":"Sign in",
    "You can reset password": "You can reset password",
    "Send": "Send",
  }
```

`language/en.json`

```
  {
    "Sessions is expired.": "Sessions is expired.",
    "Sign in":"Sign in",
    "You can reset password": "You can reset password",
    "Send": "Send",
  }
```
