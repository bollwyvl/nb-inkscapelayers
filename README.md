# nb-inkscapelayers

[Inkscape](https://inkscape.org) layers in the [Jupyter](http://jupyter.org)
notebook.

## Usage
Activate inkscapelayers

```
%load_ext inkscapelayers
```

Assuming an SVG `drawing.svg` with the following layers:

```
root
├─ foreground 1
│  └─ foreground 1.1
└─ foreground 2
```

Use the Markdown image notation to add an SVG, with a URL fragment of
`#layers=layer to show|another layer to show`:

```markdown
![alt text](drawing.svg#layers=foreground 2|foreground 1.1)
```

Works great with [RISE](https://github.com/damianavila/RISE) for using SVG
in presentations.
