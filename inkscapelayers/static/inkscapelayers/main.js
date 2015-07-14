require.config({
  paths: {
    "d3": [
      // use locally if possible
      "/nbextensions/inkscapelayers/lib/d3/d3.min",
      // fall back to cdn
      "https://cdn.jsdelivr.net/g/d3js#",
    ],
    "underscore": [
      "underscore",
      "/static/components/underscore/underscore-min",
      "https://cdn.jsdelivr.net/g/underscorejs#"
    ]
  }
});

require(
[
  "underscore",
  "d3"
],
function(_, d3){
  var serializer = new XMLSerializer(),
    namespaces =  {
      inkscape: "http://www.inkscape.org/namespaces/inkscape",
      sodipodi: "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    };

  _.extend(d3.ns.prefix, namespaces);

  function urlize(xml){
    return 'data:image/svg+xml;base64,' + btoa(xml);
  }

  function layerize(cell){
    cell.selectAll("img[src*='.svg#layers=']:not([src^='data:'])")
      .each(makeLayer);
  }

  function makeLayer(){
    var el = d3.select(this),
      layers = this.src.split("#layers=")[1].split("|");

    // load the source document
    d3.xml(this.src, "image/svg+xml", function(err, doc){
      // ensure righteous namespacing
      var svg = d3.select(doc).select("svg")
          .attr({version: 1.1, xmlns: "http://www.w3.org/2000/svg"}),
        layer = svg.selectAll("[*|groupmode = 'layer']"),
        named = layer.filter(function(){
          return layers.indexOf(d3.select(this).attr("inkscape:label")) !== -1;
        });

      // show all named (and parents of named) layers
      layer.style({
        display: function(){
          var layer = this;
          return named[0].indexOf(layer) > -1 ||
            _.any(named[0], function(child){
              return layer.contains(child);
            }) ? "inline" : "none";
        }
      });

      // set src to a shiny data url
      el.attr({src: urlize(serializer.serializeToString(svg.node()))});
    });
  }

  function init(){
    require([
      "base/js/namespace",
      "base/js/events"
    ], function(IPython, events){
      events
        .on("rendered.MarkdownCell", function(event, data){
          layerize(d3.select(data.cell.element[0]));
        });

      IPython.notebook.get_cells()
        .filter(function(cell){ return cell.cell_type === "markdown"; })
        .map(function(cell){ layerize(d3.select(cell.element[0])); });
    }, function(err){
      d3.selectAll(".rendered_html.text_cell_render")
        .call(layerize);
    });

    return init;
  }

  // pun for IPython.load_extensions
  init.load_ipython_extension = init;

  return init();
});
