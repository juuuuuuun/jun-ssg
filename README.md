![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=400&section=header&text=OSD600-Release0.1&animation=fadeIn&fontSize=90)

# JUN-SSG

### The SSG for text file!

Open Source Project 0.1

jun-ssg is a simple html generator.
You can extract your file contents and put them as HTML content.
The input file can be MarkDown or text file.

## Usage

---

### Before start to use

After downloaded files delete the package-lock.json run

```

npm install
```

at terminal

You can dowload and run the repository files

```

node src/app.js
```

or
can run by npm

```

npm i -g https://github.com/juuuuuuun/jun-ssg.git
```

### Example statements

```

Options:
  -i, --input       Input a file or a directory              [string] [required]
  -o, --output      Specify the output directory                        [string]
  -s, --stylesheet  Import css URL                                      [string]
  -v, --version     Show version number                                [boolean]
  -h, --help        Show usage information                             [boolean]
Examples:
  After install my package, jun-ssg -i 'Silver Blaze.txt'
```

## Expectation output

When you are done all steps and running this API the output will be like this

```

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>Title</h1>
  <p>This is Paragraph 1</p>
  <p>This is Paragraph 2</p>
</body>
</html>
```

## License

---

MIT

![footer](https://capsule-render.vercel.app/api?type=waving&color=auto&height=500&section=footer&text=Jun%20Song&desc=Student%20of%20Seneca%20College&animation=fadeIn&fontSize=70)
